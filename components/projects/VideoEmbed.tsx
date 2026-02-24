'use client';

import { Play } from 'lucide-react';
import { useState } from 'react';

interface VideoEmbedProps {
  src: string;
  title: string;
}

export function VideoEmbed({ src, title }: VideoEmbedProps) {
  const [loaded, setLoaded] = useState(false);

  if (!loaded) {
    return (
      <button
        type="button"
        onClick={() => setLoaded(true)}
        className="group relative aspect-video w-full overflow-hidden rounded-lg border border-border bg-muted"
        aria-label={`Play video: ${title}`}
      >
        <div className="flex h-full items-center justify-center">
          <div className="flex size-16 items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform group-hover:scale-110">
            <Play className="size-6 ml-1" />
          </div>
        </div>
      </button>
    );
  }

  return (
    <div className="aspect-video w-full overflow-hidden rounded-lg border border-border">
      <iframe
        src={src}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="h-full w-full"
      />
    </div>
  );
}
