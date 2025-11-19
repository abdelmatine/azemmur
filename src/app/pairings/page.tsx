
'use client';
import { PairingForm } from "../../components/pairings/pairing-form";
import { Bot } from "lucide-react";
import { motion } from 'framer-motion';

export default function AIPairingsPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
       transition: {
          duration: 0.7,
          ease: 'easeOut'
      }
    },
  };

  return (
    <motion.div 
      className="container mx-auto py-12 md:py-24 pt-32"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="max-w-3xl mx-auto">
        <motion.div className="text-center mb-12" variants={itemVariants}>
          <Bot className="w-12 h-12 mx-auto text-accent" />
          <h1 className="font-headline text-4xl md:text-5xl font-bold text-accent">
            KI-gestützte Kombinationen
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-foreground/80">
            Entdecken Sie die perfekten kulinarischen Begleiter für Ihr Olivenöl. Unser KI-Koch analysiert das Profil Ihres Öls, um exquisite Speisenkombinationen und Rezepte vorzuschlagen.
          </p>
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <PairingForm />
        </motion.div>
      </div>
    </motion.div>
  );
}
