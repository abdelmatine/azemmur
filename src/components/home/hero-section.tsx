
'use client';

import Link from 'next/link';
import { Button } from '../ui/button';
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import { cn } from '../../lib/utils';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
        duration: 0.5,
        ease: 'easeOut'
    }
  },
};

const letterVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
  },
}


export function HeroSection() {
  const titleWords = "Erleben Sie das goldene Elixier".split(" ");

  return (
    <section className="relative w-full h-screen flex items-center justify-center text-white overflow-hidden pt-20">
       <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover -z-10"
      >
        <source src="/videos/hero-video.mp4" type="video/mp4" />
        Ihr Browser unterstützt das Video-Tag nicht.
      </video>
      <div className="absolute inset-0 bg-black/70 z-0"></div>

      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-12 py-24 md:py-32 relative z-10">
        <motion.div
            className="space-y-6 text-center md:text-left"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
        >
          <motion.h1
            className="font-headline text-4xl sm:text-5xl md:text-7xl font-bold text-accent drop-shadow-lg"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            aria-label="Erleben Sie das goldene Elixier"
          >
            {titleWords.map((word, wordIndex) => (
              <span key={wordIndex} className="inline-block mr-4">
                {word.split("").map((char, charIndex) => (
                  <motion.span key={charIndex} variants={letterVariants} className="inline-block">
                    {char}
                  </motion.span>
                ))}
              </span>
            ))}
          </motion.h1>
          <motion.p
            className="max-w-xl mx-auto md:mx-0 text-base md:text-lg text-white drop-shadow"
            variants={itemVariants}
          >
            Von unseren sonnenverwöhnten Hainen bis zu Ihrem Tisch, Olivare bringt Ihnen das feinste, geschmackvollste Olivenöl, hergestellt mit Leidenschaft und Engagement für Nachhaltigkeit.
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4"
            variants={itemVariants}
          >
            <Button asChild size="lg" className="transition-transform hover:scale-105 w-full sm:w-auto">
              <Link href="/products">Jetzt einkaufen</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="bg-transparent text-white border-white hover:bg-white hover:text-primary dark:bg-transparent dark:text-white dark:border-white dark:hover:bg-white dark:hover:text-primary w-full sm:w-auto"
            >
              <Link href="/story">Unsere Geschichte</Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
