'use server';

import { z } from 'zod';
import { resend } from '@/lib/resend';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  message: z
    .string()
    .min(10, 'Message must be at least 10 characters')
    .max(5000, 'Message must be less than 5000 characters'),
  honeypot: z.string().max(0, 'Bot detected'),
});

export type ContactFormState = {
  success: boolean;
  error?: string;
};

// Simple in-memory rate limiting (resets on server restart)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + 3600_000 });
    return false;
  }

  if (entry.count >= 3) return true;
  entry.count++;
  return false;
}

export async function sendContactEmail(
  _prevState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const raw = {
    name: formData.get('name'),
    email: formData.get('email'),
    message: formData.get('message'),
    honeypot: formData.get('honeypot') ?? '',
  };

  const parsed = contactSchema.safeParse(raw);
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message };
  }

  // Rate limit by a placeholder IP (in production, extract from headers)
  const ip = 'global';
  if (isRateLimited(ip)) {
    return { success: false, error: 'Too many messages. Try again later.' };
  }

  const { name, email, message } = parsed.data;
  const contactEmail = process.env.CONTACT_EMAIL ?? 'ash@example.com';

  try {
    await resend.emails.send({
      from: 'Ashfolio Contact <onboarding@resend.dev>',
      to: contactEmail,
      subject: `Contact from ${name}`,
      replyTo: email,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    });

    return { success: true };
  } catch {
    return {
      success: false,
      error: 'Failed to send message. Please try again.',
    };
  }
}
