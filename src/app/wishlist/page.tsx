"use client";

import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { useWishlistStore } from "../../store/wishlist-slice";
import { useCartStore } from "../../store/cart-slice";
import { Heart, ShoppingCart, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useToast } from "../../hooks/use-toast";
import { Product } from "../../lib/products";

export const dynamic = "force-dynamic";

export default function WishlistPage() {
  const { items: wishlistItems, toggleWishlist } = useWishlistStore();
  const { addItem: addToCart } = useCartStore();
  const { toast } = useToast();

  const handleAddToCart = (e: React.MouseEvent, item: Product) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
    });
    toast({
      title: "Zum Warenkorb hinzugefügt!",
      description: `${item.name} wurde Ihrem Warenkorb hinzugefügt.`,
    });
  };

  const handleRemoveFromWishlist = (item: Product) => {
    toggleWishlist(item);
    toast({
      title: "Von der Wunschliste entfernt",
      description: `${item.name} wurde von Ihrer Wunschliste entfernt.`,
    });
  };

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

  return (
    <motion.div
      className="container mx-auto py-12 md:py-24 pt-32"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div className="text-center mb-12" variants={itemVariants}>
        <Heart className="w-12 h-12 mx-auto text-primary" />
        <h1 className="mt-4 font-headline text-4xl md:text-5xl font-bold text-accent">
          Ihre Wunschliste
        </h1>
      </motion.div>

      {wishlistItems.length === 0 ? (
        <motion.div className="text-center" variants={itemVariants}>
          <p className="text-lg text-foreground/80">
            Ihre Wunschliste ist leer.
          </p>
          <Button asChild className="mt-4">
            <Link href="/products">Produkte entdecken</Link>
          </Button>
        </motion.div>
      ) : (
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
          variants={containerVariants}
        >
          {wishlistItems.map((item) => (
            <motion.div key={item.id} variants={itemVariants}>
              <Card className="h-full flex flex-col overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group">
                <CardHeader className="p-0">
                  <Link
                    href={`/products/${item.id}`}
                    passHref
                    className="block overflow-hidden aspect-[4/5] relative"
                  >
                    <Image
                      src={item.image}
                      alt={item.name}
                      className="object-cover w-full h-full cursor-pointer transition-transform duration-500 group-hover:scale-105"
                      width={600}
                      height={800}
                    />
                  </Link>
                </CardHeader>
                <CardContent className="pt-6 flex-grow">
                  <CardTitle className="font-headline text-xl h-16">
                    <Link href={`/products/${item.id}`} passHref>
                      {item.name}
                    </Link>
                  </CardTitle>
                  <p className="text-lg font-semibold text-primary mt-2">
                    ${item.price.toFixed(2)}
                  </p>
                </CardContent>
                <CardFooter className="flex gap-2">
                  <Button
                    className="w-full"
                    onClick={(e) => handleAddToCart(e, item as any)}
                  >
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    In den Warenkorb
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="text-destructive"
                    onClick={() => handleRemoveFromWishlist(item as any)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      )}
    </motion.div>
  );
}
