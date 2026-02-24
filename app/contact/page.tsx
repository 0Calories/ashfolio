import { Github, Linkedin, Twitter } from 'lucide-react';
import type { Metadata } from 'next';
import { ContactForm } from '@/components/contact/ContactForm';
import { ScrollReveal } from '@/components/effects/ScrollReveal';
import { siteConfig } from '@/data/site';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with Ash.',
};

const socialLinks = [
  { href: siteConfig.author.github, icon: Github, label: 'GitHub' },
  { href: siteConfig.author.linkedin, icon: Linkedin, label: 'LinkedIn' },
  { href: siteConfig.author.twitter, icon: Twitter, label: 'Twitter' },
];

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 pt-32 pb-16">
      <ScrollReveal>
        <h1 className="text-4xl font-bold">Contact</h1>
        <p className="mt-2 text-muted-foreground">
          Have a question or want to work together? Drop me a message.
        </p>
      </ScrollReveal>

      <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_240px]">
        <ScrollReveal delay={0.1}>
          <ContactForm />
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Connect</h2>
            <div className="space-y-3">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  <link.icon className="size-4" />
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
