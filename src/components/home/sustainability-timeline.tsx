
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { motion } from 'framer-motion';
import { Beaker, Grape, Package, Truck } from 'lucide-react';
import { cn } from '../../lib/utils';

const timelineEvents = [
  {
    icon: Grape,
    title: 'Achtsamer Anbau',
    description: 'Wir verwenden biologische Anbaumethoden, pflegen den Boden und die Bäume, um Oliven höchster Qualität ohne synthetische Pestizide oder Düngemittel zu erzeugen.',
  },
  {
    icon: Truck,
    title: 'Ethische Ernte',
    description: 'Unsere Oliven werden von Hand zum optimalen Reifezeitpunkt gepflückt, um den besten Geschmack zu gewährleisten und Schäden zu vermeiden, und unterstützen lokale Arbeiter mit fairen Löhnen.',
  },
  {
    icon: Beaker,
    title: 'Reinheit durch Kaltpressung',
    description: 'Wir verwenden ein erstes Kaltpressverfahren innerhalb weniger Stunden nach der Ernte, um die natürlichen Antioxidantien und die reichen, komplexen Aromen des Öls zu bewahren.',
  },
  {
    icon: Package,
    title: 'Nachhaltige Abfüllung',
    description: 'Unser Öl wird in recyceltem Glas mit umweltfreundlicher Verpackung abgefüllt, um unseren CO2-Fußabdruck von unserem Hain bis in Ihre Küche zu minimieren.',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const itemVariants = (isLeft: boolean) => ({
  hidden: { opacity: 0, x: isLeft ? -50 : 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut'
    },
  },
});

export function SustainabilityTimeline() {
  return (
    <section className="py-20 sm:py-32 bg-background">
      <div className="container mx-auto px-4">
        <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5 }}
        >
          <h2 className="font-headline text-4xl md:text-5xl font-bold text-accent">Vom Baum zur Flasche</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-foreground/80">
            Unser Engagement für Nachhaltigkeit ist in jeden Schritt unseres Prozesses eingewoben.
          </p>
        </motion.div>
        
        <div className="relative max-w-4xl mx-auto">
          {/* Vertical line for desktop view - hidden on mobile */}
          <div 
            className="absolute left-1/2 top-0 h-full w-0.5 bg-border -translate-x-1/2 hidden md:block" aria-hidden="true"
          />

          <motion.div 
            className="space-y-12 md:space-y-0"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {timelineEvents.map((event, index) => {
              const isLeftOnDesktop = index % 2 === 0;
              return (
                <motion.div 
                  key={event.title} 
                  className="relative md:grid md:grid-cols-2 md:items-center md:gap-x-16"
                  variants={itemVariants(isLeftOnDesktop)}
                >
                  {/* Mobile Layout: Row */}
                   <div className={cn(
                        "md:hidden flex items-center gap-4",
                        index % 2 === 0 ? "flex-row" : "flex-row-reverse"
                    )}>
                       <div className="relative z-10 w-12 h-12 rounded-full bg-primary flex items-center justify-center shadow-md flex-shrink-0">
                          <event.icon className="w-6 h-6 text-primary-foreground" />
                      </div>
                       <Card className="shadow-lg w-full">
                        <CardHeader>
                          <CardTitle className="font-headline text-2xl">{event.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-muted-foreground">{event.description}</p>
                        </CardContent>
                      </Card>
                    </div>

                  {/* Desktop Layout: Alternating sides */}
                  <div className={cn(
                    "hidden md:block", 
                    isLeftOnDesktop ? "text-right" : "col-start-2 text-left"
                  )}>
                     <Card className="shadow-lg w-full">
                       <CardHeader>
                         <CardTitle className="font-headline text-2xl">{event.title}</CardTitle>
                       </CardHeader>
                       <CardContent>
                         <p className="text-muted-foreground">{event.description}</p>
                       </CardContent>
                     </Card>
                  </div>

                  {/* Desktop Icon */}
                   <div className="hidden md:flex absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-primary items-center justify-center z-10 shadow-md">
                        <event.icon className="w-6 h-6 text-primary-foreground" />
                    </div>

                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
