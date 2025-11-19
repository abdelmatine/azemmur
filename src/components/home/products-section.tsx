
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '../ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { motion } from 'framer-motion';
import { products as allProducts, Product } from '../../data/products';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';

export function ProductsSection() {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        // Simulate API fetch and get the first 3 products
        setProducts(allProducts.slice(0, 3));
    }, []);

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
          <h2 className="font-headline text-4xl md:text-5xl font-bold text-accent">Unsere vorgestellten Öle</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-foreground/80">
            Eine kuratierte Auswahl unserer besten Olivenöle, die von unseren Kunden geliebt werden.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, index) => (
                 <motion.div 
                    key={product.id} 
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                    <Card className="h-full flex flex-col overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group">
                        <CardHeader className="p-0">
                            <Link href={`/products/${product.id}`} passHref className="block overflow-hidden aspect-[4/5]">
                                <Image
                                    src={product.images[0].src}
                                    alt={product.name}
                                    className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                                    width={600}
                                    height={800}
                                />
                            </Link>
                        </CardHeader>
                        <CardContent className="pt-6 flex-grow">
                            <CardTitle className="font-headline text-xl h-16">
                                <Link href={`/products/${product.id}`} passHref>{product.name}</Link>
                            </CardTitle>
                        </CardContent>
                        <CardFooter>
                            <Button asChild variant="ghost" className="w-full justify-start text-base p-2 h-auto">
                                <Link href={`/products/${product.id}`}>
                                    Entdecken
                                    <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                                </Link>
                            </Button>
                        </CardFooter>
                    </Card>
                </motion.div>
            ))}
        </div>

        <div className="text-center mt-16">
            <Button asChild size="lg">
                <Link href="/products">Alle Produkte ansehen</Link>
            </Button>
        </div>

      </div>
    </section>
  );
}
