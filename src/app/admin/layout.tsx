
'use client';

import React from 'react';
import { LayoutDashboard, Users, ShoppingBag, Package } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Tabs, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { motion } from 'framer-motion';
import { ScrollArea, ScrollBar } from '../../components/ui/scroll-area';

const adminNavItems = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Produkte', href: '/admin/products', icon: Package },
    { name: 'Bestellungen', href: '/admin/orders', icon: ShoppingBag },
    { name: 'Kunden', href: '/admin/customers', icon: Users },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname();

  return (
    <div className="container mx-auto py-12 md:py-24 pt-32">
        <motion.div 
            className="flex flex-col items-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
        >
            <h1 className="font-headline text-4xl md:text-5xl font-bold text-accent mb-4">Admin-Panel</h1>
            <p className="text-lg text-muted-foreground mb-8">Verwalten Sie Ihren Shop mit Leichtigkeit.</p>

            <Tabs value={pathname} className="w-full max-w-md">
                <ScrollArea className="w-full whitespace-nowrap rounded-lg">
                    <TabsList className="inline-flex">
                        {adminNavItems.map((item) => (
                            <TabsTrigger value={item.href} asChild key={item.href}>
                                <Link href={item.href}>
                                    <item.icon className="w-4 h-4 mr-2" />
                                    {item.name}
                                </Link>
                            </TabsTrigger>
                        ))}
                    </TabsList>
                    <ScrollBar orientation="horizontal" className="h-2.5" />
                </ScrollArea>
            </Tabs>
        </motion.div>

        <main className="flex-1 p-4 md:p-8 bg-card rounded-lg shadow-sm mt-8">
            {children}
        </main>
    </div>
  );
}
