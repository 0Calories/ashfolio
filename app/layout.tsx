import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import type { Metadata } from 'next';
import './globals.css';
import { Starfield } from '@/components/effects/Starfield';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { siteConfig } from '@/data/site';
import { fontDisplay } from '@/lib/fonts';
import { jsonLdPerson, jsonLdWebsite } from '@/lib/metadata';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : 'http://localhost:3000',
  ),
  title: {
    default: siteConfig.title,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.description,
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.title,
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn('dark', fontDisplay.variable)}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([jsonLdWebsite(), jsonLdPerson()]),
          }}
        />
        <a href="#main" className="skip-to-content">
          Skip to content
        </a>
        <Starfield />
        <div className="relative z-10 flex min-h-dvh flex-col">
          <Header />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
