
'use client';

import React from 'react';
import { ShoppingBag, User, Heart } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

const profileNavItems = [
    { name: 'Meine Bestellungen', href: '/profile/orders', icon: ShoppingBag },
    { name: 'Meine Wunschliste', href: '/wishlist', icon: Heart },
    { name: 'Meine Daten', href: '/profile/details', icon: User },
];

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname();

  return (
    <div className="container mx-auto py-12 md:py-24 pt-32">
        <motion.div 
            className="flex flex-col md:flex-row gap-12"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
        >
            <aside className="md:w-1/4">
                <h2 className="font-headline text-2xl font-bold text-accent mb-6">Mein Konto</h2>
                <nav className="flex flex-col space-y-2">
                    {profileNavItems.map((item) => (
                        <Link 
                            key={item.href} 
                            href={item.href}
                            className={`flex items-center gap-3 px-4 py-3 rounded-md transition-colors ${
                                pathname === item.href 
                                ? 'bg-primary text-primary-foreground' 
                                : 'hover:bg-muted'
                            }`}
                        >
                            <item.icon className="w-5 h-5" />
                            <span>{item.name}</span>
                        </Link>
                    ))}
                </nav>
            </aside>

            <main className="flex-1">
                {children}
            </main>
        </motion.div>
    </div>
  );
}
