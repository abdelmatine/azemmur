"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { LeafIcon } from "../../components/icons/leaf-icon";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

export default function StoryPage() {
  return (
    <motion.div initial="hidden" animate="visible" variants={containerVariants}>
      <section className="py-24 pt-32 text-center bg-secondary/10">
        <motion.div className="container" variants={itemVariants}>
          <h1 className="font-headline text-4xl md:text-5xl font-bold text-accent">
            Vom Baum zur Flasche
          </h1>
          <p className="mt-4 max-w-3xl mx-auto text-lg text-foreground/80">
            Eine Geschichte von Familie, Tradition und einer unerschütterlichen
            Hingabe an die Kunst des Olivenöls. Unsere Reise beginnt in den
            alten Hainen von Dougga, Tunesien.
          </p>
        </motion.div>
      </section>

      <section className="py-20 sm:py-32">
        <div className="container mx-auto">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={containerVariants}
          >
            <motion.div variants={itemVariants}>
              <h2 className="font-headline text-3xl font-bold text-primary mb-4">
                Der alte Boden von Dougga
              </h2>
              <p className="text-foreground/80 mb-4">
                Unsere Geschichte ist tief in der sonnenverwöhnten Erde von
                Dougga, Tunesien, verwurzelt. Dieses alte Land, reich an
                Geschichte und von Generationen von Landwirten gepflegt, ist die
                Heimat unserer geschätzten Olivenhaine. Das einzigartige Klima
                und der fruchtbare Boden bringen Oliven mit einem
                unvergleichlichen Geschmacksprofil hervor, das die Essenz des
                Mittelmeers in sich trägt.
              </p>
              <p className="text-foreground/80">
                Hier, inmitten der Ruinen einer vergangenen Zeit, gedeihen
                unsere Bäume. Wir ehren die traditionellen, nachhaltigen
                landwirtschaftlichen Praktiken, die über Jahrhunderte
                weitergegeben wurden, und stellen sicher, dass jeder Tropfen
                unseres Öls ein Zeugnis für das reiche Erbe dieses
                bemerkenswerten Ortes ist.
              </p>
            </motion.div>
            <motion.div
              className="aspect-square relative rounded-lg overflow-hidden shadow-lg"
              variants={itemVariants}
            >
              <Image
                src="/images/story2.png"
                alt="Tunesische Olivenhaine"
                layout="fill"
                objectFit="cover"
                data-ai-hint="tunesische landschaft"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      <div className="bg-story-tunisia bg-cover bg-center bg-fixed">
        <div className="py-32 bg-primary/80 dark:bg-primary/90">
          <motion.div
            className="container text-center text-white"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5 }}
          >
            <LeafIcon className="w-12 h-12 mx-auto mb-4 text-accent" />
            <p className="font-headline text-3xl max-w-3xl mx-auto">
              "Jede Olive erzählt die Geschichte der Sonne, des Bodens und der
              Hände, die sie gepflegt haben."
            </p>
          </motion.div>
        </div>
      </div>

      <section className="py-20 sm:py-32">
        <div className="container mx-auto">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={containerVariants}
          >
            <motion.div
              className="aspect-square relative rounded-lg overflow-hidden shadow-lg"
              variants={itemVariants}
            >
              <Image
                src="/images/story1.jpg"
                alt="Hände, die Oliven ernten"
                layout="fill"
                objectFit="cover"
                data-ai-hint="oliven ernten"
              />
            </motion.div>
            <motion.div variants={itemVariants}>
              <h2 className="font-headline text-3xl font-bold text-primary mb-4">
                Die Kunst der Ernte
              </h2>
              <p className="text-foreground/80 mb-4">
                Unsere Ernte ist ein Fest der Tradition. Jede Olive wird von
                erfahrenen lokalen Arbeitern von Hand gepflückt, um
                sicherzustellen, dass nur die besten Früchte ausgewählt werden.
                Diese sorgfältige Methode schont nicht nur die Oliven, sondern
                unterstützt auch die lokale Gemeinschaft, indem sie faire Löhne
                und ethische Arbeitspraktiken bietet.
              </p>
              <p className="text-foreground/80">
                Wir ernten zum optimalen Reifezeitpunkt, einem kurzen
                Zeitfenster, in dem der Geschmack am intensivsten und die
                gesundheitlichen Vorteile am höchsten sind. Es ist ein Wettlauf
                gegen die Zeit, angetrieben von Leidenschaft und Präzision.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="py-20 sm:py-32 bg-secondary/10">
        <div className="container mx-auto">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={containerVariants}
          >
            <motion.div variants={itemVariants}>
              <h2 className="font-headline text-3xl font-bold text-primary mb-4">
                Reinheit durch die Presse
              </h2>
              <p className="text-foreground/80 mb-4">
                Innerhalb weniger Stunden nach der Ernte werden unsere Oliven
                zur Mühle gebracht. Wir verwenden ausschließlich ein
                Kaltpressverfahren der ersten Pressung, eine Methode, die die
                delikaten Aromen und wertvollen Nährstoffe des Öls bewahrt. Es
                werden keine übermäßige Hitze oder Chemikalien verwendet – nur
                reiner, unverfälschter Olivensaft.
              </p>
              <p className="text-foreground/80">
                Dieser Prozess stellt sicher, dass unser Öl seinen hohen Gehalt
                an Antioxidantien und seinen reichen, komplexen Geschmack
                behält. Es ist der Unterschied, den Sie schmecken und fühlen
                können.
              </p>
            </motion.div>
            <motion.div
              className="aspect-square relative rounded-lg overflow-hidden shadow-lg"
              variants={itemVariants}
            >
              <Image
                src="/images/story.jpg"
                alt="Olivenölpresse"
                layout="fill"
                objectFit="cover"
                data-ai-hint="olivenöl pressen"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
}
