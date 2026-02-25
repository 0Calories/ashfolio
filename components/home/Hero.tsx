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
          className="relative z-10"
        >
          <motion.p
            variants={item}
            className="text-sm font-medium tracking-wide text-primary uppercase"
          >
            Fullstack Software Engineer
          </motion.p>

          <motion.h1
            variants={item}
            className="mt-4 max-w-3xl text-5xl leading-[1.1] font-bold tracking-tight sm:text-6xl lg:text-7xl"
          >
            Hi, I&apos;m <span className="text-primary">Ash</span>
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground"
          >
            I build scalable web applications with a focus on peformance and
            code quality. At{' '}
            <span className="font-medium text-primary">Sentry</span>, I spent
            over 3.5 years shipping features for an open-source SaaS loved and
            used by over
            <span className="font-medium text-primary"> 4M developers</span> and{' '}
            <span className="font-medium text-primary">
              100K+ organizations
            </span>{' '}
            worldwide.
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
