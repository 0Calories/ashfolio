import { Github, Linkedin } from 'lucide-react';
import Link from 'next/link';
import { navLinks } from '@/data/navigation';
import { siteConfig } from '@/data/site';

function XLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

const socialLinks = [
  { href: siteConfig.author.github, icon: Github, label: 'GitHub' },
  { href: siteConfig.author.linkedin, icon: Linkedin, label: 'LinkedIn' },
  { href: siteConfig.author.twitter, icon: XLogo, label: 'X' },
];

export function Footer() {
  return (
    <footer className="border-t border-border/50">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 px-6 py-12 md:flex-row md:justify-between">
        <nav className="flex flex-wrap justify-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground transition-colors hover:text-foreground"
              aria-label={link.label}
            >
              <link.icon className="size-4" />
            </a>
          ))}
        </div>

        <p className="text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} {siteConfig.name}
        </p>
      </div>
    </footer>
  );
}
