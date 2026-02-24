import type { MDXComponents } from 'mdx/types';
import Image from 'next/image';
import Link from 'next/link';

export const mdxComponents: MDXComponents = {
  h1: (props) => (
    <h1 className="mt-10 mb-4 text-3xl font-bold tracking-tight" {...props} />
  ),
  h2: (props) => (
    <h2
      className="mt-10 mb-4 text-2xl font-bold tracking-tight scroll-mt-24"
      {...props}
    />
  ),
  h3: (props) => (
    <h3
      className="mt-8 mb-3 text-xl font-semibold tracking-tight scroll-mt-24"
      {...props}
    />
  ),
  p: (props) => <p className="mb-4 leading-7 text-foreground/90" {...props} />,
  a: ({ href, children, ...props }) => {
    if (href?.startsWith('/')) {
      return (
        <Link
          href={href}
          className="text-primary underline underline-offset-4 hover:text-primary/80"
          {...props}
        >
          {children}
        </Link>
      );
    }
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-primary underline underline-offset-4 hover:text-primary/80"
        {...props}
      >
        {children}
      </a>
    );
  },
  ul: (props) => <ul className="mb-4 ml-6 list-disc space-y-1" {...props} />,
  ol: (props) => <ol className="mb-4 ml-6 list-decimal space-y-1" {...props} />,
  li: (props) => <li className="leading-7" {...props} />,
  blockquote: (props) => (
    <blockquote
      className="mt-4 mb-4 border-l-2 border-primary/50 pl-4 italic text-muted-foreground"
      {...props}
    />
  ),
  code: (props) => (
    <code
      className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm"
      {...props}
    />
  ),
  pre: ({ children, ...props }) => (
    <pre
      className="mb-4 overflow-x-auto rounded-lg border border-border bg-card p-4 font-mono text-sm"
      {...props}
    >
      {children}
    </pre>
  ),
  img: ({ src, alt, ...props }) => (
    <Image
      src={src ?? ''}
      alt={alt ?? ''}
      width={800}
      height={450}
      className="my-6 rounded-lg border border-border"
      {...props}
    />
  ),
  hr: () => <hr className="my-8 border-border" />,
};
