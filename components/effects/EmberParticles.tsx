'use client';

import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { useMemo } from 'react';

const PARTICLE_COUNT = 25;
const SEED = 420;
const HASH_PRIME = 9973;
const HASH_MOD = 10000;

const PALETTE = [
  'oklch(0.82 0.15 65)',
  'oklch(0.75 0.18 55)',
  'oklch(0.75 0.18 75)',
  'oklch(0.82 0.14 85)',
  'oklch(0.68 0.22 45)',
];

interface Particle {
  id: number;
  x: number;
  size: number;
  delay: number;
  duration: number;
  drift: number;
  color: string;
  opacity: number;
}

function hash(index: number, offset = 0): number {
  return (SEED * (index + 1 + offset) * HASH_PRIME) % HASH_MOD;
}

function generateParticles(): Particle[] {
  return Array.from({ length: PARTICLE_COUNT }, (_, i) => {
    const h = hash(i);
    const colorH = hash(i, 77);
    const opacityH = hash(i, 111);
    const durationH = hash(i, 222);

    return {
      id: i,
      x: 5 + (h % 90),
      size: 2 + ((h % 100) / 100) * 4,
      delay: ((h % 1000) / 1000) * 6,
      duration: 4 + ((durationH % 1000) / 1000) * 8,
      drift: -15 + (h % 30),
      color: PALETTE[colorH % PALETTE.length],
      opacity: 0.3 + ((opacityH % 100) / 100) * 0.5,
    };
  });
}

export function EmberParticles() {
  const shouldReduceMotion = useReducedMotion();
  const particles = useMemo(generateParticles, []);

  if (shouldReduceMotion) return null;

  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden
    >
      <AnimatePresence>
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full"
            style={{
              left: `${p.x}%`,
              bottom: '-2%',
              width: p.size,
              height: p.size,
              backgroundColor: p.color,
            }}
            animate={{
              y: [0, -800],
              x: [0, p.drift],
              opacity: [0, p.opacity, p.opacity, 0],
            }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              repeat: Number.POSITIVE_INFINITY,
              ease: 'linear',
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
