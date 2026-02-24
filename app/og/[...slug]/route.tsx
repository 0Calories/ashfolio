import { ImageResponse } from 'next/og';
import type { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const title = searchParams.get('title') ?? 'Ash — Full-Stack Developer';
  const description =
    searchParams.get('description') ??
    'Building polished, performant web experiences.';

  return new ImageResponse(
    <div
      style={{
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '80px',
        background: '#1a1a2e',
        color: '#f0efe8',
        fontFamily: 'sans-serif',
      }}
    >
      <div
        style={{
          fontSize: 64,
          fontWeight: 700,
          lineHeight: 1.1,
          letterSpacing: '-0.02em',
          maxWidth: '900px',
        }}
      >
        {title}
      </div>
      <div
        style={{
          fontSize: 28,
          marginTop: 24,
          color: '#a09fa0',
          maxWidth: '800px',
        }}
      >
        {description}
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          marginTop: 48,
          fontSize: 24,
          color: '#d4a843',
        }}
      >
        ash.dev
      </div>
    </div>,
    {
      width: 1200,
      height: 630,
    },
  );
}
