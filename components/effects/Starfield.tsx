'use client';

import { useEffect, useMemo, useRef } from 'react';

// ─── Mulberry32 seeded PRNG — well-distributed, deterministic ───
function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// ─── Star color palette — saturated enough to be visible as colors ───
const STAR_COLORS = [
  { color: '#d0ccff', glow: 'rgba(170, 160, 255, 0.5)', weight: 26 }, // soft indigo-white
  { color: '#a89eff', glow: 'rgba(140, 120, 255, 0.6)', weight: 22 }, // medium indigo
  { color: '#7cc4ff', glow: 'rgba(100, 170, 255, 0.5)', weight: 16 }, // bright cyan
  { color: '#c09eff', glow: 'rgba(160, 130, 255, 0.6)', weight: 14 }, // violet
  { color: '#ffd090', glow: 'rgba(255, 190, 100, 0.5)', weight: 12 }, // warm gold
  { color: '#ffaacc', glow: 'rgba(255, 150, 190, 0.5)', weight: 10 }, // soft rose
];

function pickColor(rng: () => number) {
  let roll = rng() * 100;
  for (const entry of STAR_COLORS) {
    roll -= entry.weight;
    if (roll <= 0) return entry;
  }
  return STAR_COLORS[0];
}

// ─── Star type ───
interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  duration: number;
  delay: number;
  layer: number;
  color: string;
  glow: string;
}

// Layer 0 — many small dim stars for depth
// Layer 1 — medium stars, colors visible, clear twinkle
// Layer 2 — bright feature stars with colored glow halos
const LAYERS = [
  { count: 70, sizeMin: 1, sizeMax: 1.5, opMin: 0.2, opMax: 0.5, scrollRate: 0.02 },
  { count: 40, sizeMin: 2, sizeMax: 3, opMin: 0.5, opMax: 0.85, scrollRate: 0.05 },
  { count: 15, sizeMin: 3, sizeMax: 5, opMin: 0.75, opMax: 1, scrollRate: 0.1 },
];

function generateStars(): Star[] {
  const rng = mulberry32(42);
  const stars: Star[] = [];
  let id = 0;

  for (const [layer, cfg] of LAYERS.entries()) {
    for (let i = 0; i < cfg.count; i++) {
      const { color, glow } = pickColor(rng);
      stars.push({
        id: id++,
        x: rng() * 100,
        y: rng() * 100,
        size: cfg.sizeMin + rng() * (cfg.sizeMax - cfg.sizeMin),
        opacity: cfg.opMin + rng() * (cfg.opMax - cfg.opMin),
        duration: 2 + rng() * 4,
        delay: rng() * 5,
        layer,
        color,
        glow,
      });
    }
  }

  return stars;
}

// ─── Comet color palette — soft, not overpowering ───
const COMET_COLORS = [
  { head: 'rgba(210, 200, 255, 0.6)', mid: 'rgba(180, 170, 255, 0.2)', tail: 'rgba(160, 150, 255, 0.04)' },
  { head: 'rgba(140, 195, 255, 0.6)', mid: 'rgba(100, 170, 255, 0.2)', tail: 'rgba(80, 150, 255, 0.04)' },
  { head: 'rgba(190, 165, 255, 0.6)', mid: 'rgba(170, 140, 255, 0.2)', tail: 'rgba(150, 120, 255, 0.04)' },
  { head: 'rgba(255, 215, 160, 0.6)', mid: 'rgba(255, 190, 120, 0.2)', tail: 'rgba(255, 170, 100, 0.04)' },
  { head: 'rgba(255, 185, 205, 0.6)', mid: 'rgba(255, 150, 180, 0.2)', tail: 'rgba(255, 130, 160, 0.04)' },
];

export function Starfield() {
  const stars = useMemo(generateStars, []);
  const layerRefs = useRef<(HTMLDivElement | null)[]>([null, null, null]);
  const shootingRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef(0);

  // Scroll-based parallax — each layer shifts at a different rate
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mq.matches) return;

    const tick = () => {
      const scrollY = window.scrollY;
      for (let i = 0; i < LAYERS.length; i++) {
        const el = layerRefs.current[i];
        if (el) {
          el.style.transform = `translate3d(0, ${-scrollY * LAYERS[i].scrollRate}px, 0)`;
        }
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  // Shooting stars — comets streaking from right to bottom-left
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mq.matches) return;

    const container = shootingRef.current;
    if (!container) return;

    function spawnShootingStar() {
      if (!container) return;

      // Spawn from right side or upper-middle area of viewport
      const startX = 40 + Math.random() * 60;
      const startY = Math.random() * 35;
      // Gentle diagonal — slightly more downward than horizontal (155-175°)
      const angle = 155 + Math.random() * 20;
      const length = 150 + Math.random() * 150;
      // Slow, graceful drift: 6 – 14 seconds
      const duration = 6 + Math.random() * 8;

      // Pick a random comet color
      const palette = COMET_COLORS[Math.floor(Math.random() * COMET_COLORS.length)];

      // Wrapper handles rotation, inner streak animates the translate
      const wrapper = document.createElement('div');
      wrapper.style.cssText = `
        position: absolute;
        left: ${startX}%;
        top: ${startY}%;
        transform: rotate(${angle}deg);
        pointer-events: none;
      `;

      const streak = document.createElement('div');
      streak.style.cssText = `
        width: ${length}px;
        height: 1px;
        border-radius: 1px;
        background: linear-gradient(90deg, transparent 0%, ${palette.tail} 20%, ${palette.mid} 55%, ${palette.head} 100%);
        opacity: 0;
        animation: sf-shooting ${duration}s ease-out forwards;
      `;

      wrapper.appendChild(streak);
      container.appendChild(wrapper);
      streak.addEventListener('animationend', () => wrapper.remove());
    }

    let timeout: ReturnType<typeof setTimeout>;
    function scheduleNext() {
      const delay = 6000 + Math.random() * 8000;
      timeout = setTimeout(() => {
        spawnShootingStar();
        scheduleNext();
      }, delay);
    }

    // First shooting star after 3-6s
    timeout = setTimeout(() => {
      spawnShootingStar();
      scheduleNext();
    }, 3000 + Math.random() * 3000);

    return () => clearTimeout(timeout);
  }, []);

  // Group stars by layer for parallax containers
  const byLayer = useMemo(() => {
    const out: Star[][] = [[], [], []];
    for (const s of stars) out[s.layer].push(s);
    return out;
  }, [stars]);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      style={
        {
          opacity: 'var(--sf-opacity)',
          filter: 'var(--sf-filter)',
        } as React.CSSProperties
      }
      aria-hidden
    >
      <style>{`
        @keyframes sf-twinkle {
          0%, 100% { opacity: var(--sf-lo); }
          50% { opacity: var(--sf-hi); }
        }
        @keyframes sf-shooting {
          0% { opacity: 0; transform: translateX(0); }
          8% { opacity: 0.5; }
          50% { opacity: 0.35; }
          100% { opacity: 0; transform: translateX(150vmax); }
        }
        @media (prefers-reduced-motion: reduce) {
          [data-star] { animation: none !important; }
        }
      `}</style>

      {byLayer.map((layerStars, li) => (
        <div
          key={li}
          ref={(el) => {
            layerRefs.current[li] = el;
          }}
          className="absolute inset-0 will-change-transform"
        >
          {layerStars.map((s) => {
            const glowSize =
              s.layer === 2
                ? s.size * 5
                : s.layer === 1
                  ? s.size * 3
                  : 0;

            return (
              <div
                key={s.id}
                data-star
                className="absolute rounded-full"
                style={
                  {
                    left: `${s.x}%`,
                    top: `${s.y}%`,
                    width: s.size,
                    height: s.size,
                    backgroundColor: s.color,
                    boxShadow:
                      glowSize > 0
                        ? `0 0 ${glowSize}px ${s.glow}, 0 0 ${glowSize * 2}px ${s.glow}`
                        : undefined,
                    opacity: s.opacity * 0.7,
                    '--sf-lo': s.opacity * 0.2,
                    '--sf-hi': s.opacity,
                    animation: `sf-twinkle ${s.duration}s ${s.delay}s ease-in-out infinite`,
                  } as React.CSSProperties
                }
              />
            );
          })}
        </div>
      ))}

      {/* Shooting stars container */}
      <div ref={shootingRef} className="absolute inset-0" />
    </div>
  );
}
