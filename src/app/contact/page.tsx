"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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
      ease: "easeOut",
    },
  },
};

export default function ContactPage() {
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Nachricht gesendet!",
      description:
        "Vielen Dank, dass Sie sich gemeldet haben. Wir werden uns bald bei Ihnen melden.",
    });
    (e.target as HTMLFormElement).reset();
  };

  return (
    <motion.div
      className="container mx-auto py-12 md:py-24 pt-32"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div className="text-center mb-12" variants={itemVariants}>
        <Mail className="w-12 h-12 mx-auto text-accent" />
        <h1 className="font-headline text-4xl md:text-5xl font-bold text-accent">
          Kontaktieren Sie uns
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-foreground/80">
          Haben Sie eine Frage oder möchten Sie einfach nur Hallo sagen? Wir
          freuen uns, von Ihnen zu hören.
        </p>
      </motion.div>

      <motion.div
        className="grid md:grid-cols-2 gap-12"
        variants={itemVariants}
      >
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="font-headline text-2xl">
              Eine Nachricht hinterlassen
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="Ihr Name" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">E-Mail</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="ihre@email.com"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Nachricht</Label>
                <Textarea
                  id="message"
                  placeholder="Ihre Nachricht hier..."
                  required
                  rows={5}
                />
              </div>
              <Button type="submit" className="w-full">
                <Send className="mr-2 h-4 w-4" />
                Nachricht senden
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="space-y-8">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="font-headline text-2xl">
                Kontaktinformationen
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-foreground/90">
              <div className="flex items-start space-x-4">
                <MapPin className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                <span>Olivenhain 123, Toskana, Italien</span>
              </div>
              <div className="flex items-center space-x-4">
                <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                <span>+39 012 345 6789</span>
              </div>
              <div className="flex items-center space-x-4">
                <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                <span>kontakt@olivare.com</span>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d371457.1428383826!2d10.9313936994781!3d43.34969963198942!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x132a2148d4f506bd%3A0x353223f4955b982b!2sToskana%2C%20Italien!5e0!3m2!1sde!2sde!4v1721936936301!5m2!1sde!2sde"
              width="100%"
              height="300"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Standortkarte"
            ></iframe>
          </Card>
        </div>
      </motion.div>
    </motion.div>
  );
}
