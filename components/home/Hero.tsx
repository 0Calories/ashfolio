'use client';

import { ArrowRight, Mail } from 'lucide-react';
import { motion } from 'motion/react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export function Hero() {
  return (
    <section className="relative flex min-h-[calc(100dvh-4rem)] items-center pt-16">
      <div className="mx-auto w-full max-w-5xl px-6">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="relative z-10 text-center"
        >
          {/* Subtle radial glow behind heading */}
          <div
            className="pointer-events-none absolute top-0 left-1/2 -z-10 h-64 w-full max-w-2xl -translate-x-1/2 -translate-y-1/4"
            style={{
              background:
                'radial-gradient(ellipse at 50% 50%, oklch(0.75 0.14 200 / 0.07), transparent 70%)',
            }}
            aria-hidden
          />

          <motion.p
            variants={item}
            className="text-sm  tracking-widest text-muted-foreground "
          >
            Fullstack Software Engineer
          </motion.p>

          <motion.h1
            variants={item}
            className="mx-auto mt-4 max-w-3xl text-5xl leading-[1.1] font-extrabold tracking-tight sm:text-6xl lg:text-7xl"
          >
            Hi, I&apos;m{' '}
            <span className="text-glow-primary text-primary">Ash</span>
          </motion.h1>

          <motion.p
            variants={item}
            className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground"
          >
            I build scalable web applications with a focus on peformance and
            code quality. At <span className=" text-foreground">Sentry</span>, I
            spent over 3.5 years shipping features for an open-source SaaS loved
            and used by over
            <span className=" text-foreground"> 4M developers</span> and{' '}
            <span className=" text-foreground">100K+ organizations</span>{' '}
            worldwide.
          </motion.p>

          <motion.div
            variants={item}
            className="mt-8 flex flex-wrap justify-center gap-4"
          >
            <Button asChild size="lg">
              <Link href="/projects">
                View my work
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/contact">
                <Mail className="size-4" />
                Get in touch
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
