"use client";

import Link from "next/link";
import { Button } from "../components/ui/button";
import { OliveIcon } from "../components/icons/olive-icon";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <div className="container mx-auto flex h-[calc(100vh-10rem)] items-center justify-center text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="relative inline-block">
          <OliveIcon className="w-48 h-48 text-primary/10" />
          <h1 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-headline text-8xl font-bold text-primary">
            404
          </h1>
        </div>

        <h2 className="mt-8 font-headline text-3xl font-bold text-primary">
          Seite nicht gefunden
        </h2>
        <p className="mt-4 max-w-md mx-auto text-lg text-foreground/80">
          Hoppla! Die von Ihnen gesuchte Seite existiert nicht. Sie wurde
          möglicherweise verschoben oder gelöscht.
        </p>
        <Button asChild className="mt-8">
          <Link href="/">Zurück zur Startseite</Link>
        </Button>
      </motion.div>
    </div>
  );
}
