
'use client'

import { Facebook, Instagram, Twitter, MapPin, Phone, Mail } from 'lucide-react';
import Link from 'next/link';

const quickLinks = [
    { href: '/', label: 'Startseite' },
    { href: '/story', label: 'Unsere Geschichte' },
    { href: '/products', label: 'Produkte' },
    { href: '/pairings', label: 'KI-Kombinationen' },
];

export function Footer() {
  return (
    <footer className="bg-background border-t border-border/40">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
             <Link href="/" className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-accent text-accent-foreground rounded-lg flex items-center justify-center shadow-md">
                    <span className="text-2xl font-headline font-bold">O</span>
                </div>
                <span className="text-xl font-headline font-bold text-accent">
                    Olivare
                </span>
            </Link>
            <p className="text-muted-foreground">
              Von unseren sonnenverwöhnten Hainen bis zu Ihrem Tisch, das feinste Olivenöl, mit Leidenschaft hergestellt.
            </p>
            <div className="flex space-x-4">
              <Link href="#" aria-label="Facebook">
                <Facebook className="w-5 h-5 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
              </Link>
              <Link href="#" aria-label="Instagram">
                <Instagram className="w-5 h-5 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
              </Link>
              <Link href="#" aria-label="Twitter">
                <Twitter className="w-5 h-5 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-headline text-lg font-semibold">Schnelllinks</h3>
            <ul className="space-y-2">
              {quickLinks.map(link => (
                <li key={link.href}>
                    <Link href={link.href} className="text-muted-foreground hover:text-primary transition-colors">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="font-headline text-lg font-semibold">Kontaktieren Sie uns</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                <span className="text-muted-foreground text-sm">Olivenhain 123, Toskana, Italien</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-primary flex-shrink-0" />
                <span className="text-muted-foreground text-sm">+39 012 345 6789</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-primary flex-shrink-0" />
                <span className="text-muted-foreground text-sm">kontakt@olivare.com</span>
              </div>
            </div>
          </div>

          {/* Hours & Language */}
          <div className="space-y-4">
            <h3 className="font-headline text-lg font-semibold">Öffnungszeiten</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex justify-between">
                <span>Mo - Fr:</span>
                <span>9:00 – 18:00</span>
              </div>
               <div className="flex justify-between">
                <span>Samstag:</span>
                <span>10:00 – 16:00</span>
              </div>
               <div className="flex justify-between">
                <span>Sonntag:</span>
                <span>Geschlossen</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-border/40 mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Olivare. Alle Rechte vorbehalten.</p>
        </div>
      </div>
    </footer>
  );
};
