'use client';

import { ArrowRight, Mail } from 'lucide-react';
import { motion } from 'motion/react';
import Link from 'next/link';
import { EmberParticles } from '@/components/effects/EmberParticles';
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
    <section className="relative flex min-h-[calc(100dvh-4rem)] items-center overflow-hidden pt-16">
      <EmberParticles />
      <div className="mx-auto w-full max-w-5xl px-6">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="relative z-10 max-w-2xl"
        >
          <motion.p
            variants={item}
            className="text-sm font-medium tracking-wide text-primary uppercase"
          >
            Full-Stack Developer
          </motion.p>

          <motion.h1
            variants={item}
            className="mt-4 text-5xl leading-[1.1] font-bold tracking-tight sm:text-6xl lg:text-7xl"
          >
            Hi, I&apos;m <span className="text-primary">Ash</span>
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-6 max-w-lg text-lg text-muted-foreground"
          >
            I build polished, performant web experiences with React, Next.js,
            and Node.js. Currently crafting{' '}
            <span className="font-medium text-foreground">Hibana</span> — a
            gamified habit tracker.
          </motion.p>

          <motion.div variants={item} className="mt-8 flex flex-wrap gap-4">
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
