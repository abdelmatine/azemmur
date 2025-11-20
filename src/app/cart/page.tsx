"use client";

import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Separator } from "../../components/ui/separator";
import { useCartStore } from "../../store/cart-slice";
import { ShoppingCart, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export const dynamic = "force-dynamic";

export default function CartPage() {
  const { items: cartItems, removeItem, updateQuantity } = useCartStore();

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const shipping = 5.0;
  const total = subtotal + shipping;

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
        <ShoppingCart className="w-12 h-12 mx-auto text-primary" />
        <h1 className="mt-4 font-headline text-4xl md:text-5xl font-bold text-accent">
          Ihr Warenkorb
        </h1>
      </motion.div>

      {cartItems.length === 0 ? (
        <motion.div className="text-center" variants={itemVariants}>
          <p className="text-lg text-foreground/80">Ihr Warenkorb ist leer.</p>
          <Button asChild className="mt-4">
            <Link href="/products">Weiter einkaufen</Link>
          </Button>
        </motion.div>
      ) : (
        <motion.div
          className="grid lg:grid-cols-3 gap-12"
          variants={containerVariants}
        >
          <motion.div className="lg:col-span-2" variants={itemVariants}>
            <Card>
              <CardHeader>
                <CardTitle>Artikel im Warenkorb</CardTitle>
              </CardHeader>
              <CardContent>
                <motion.div className="space-y-6" variants={containerVariants}>
                  {cartItems.map((item) => (
                    <motion.div
                      key={item.id}
                      className="flex flex-col sm:flex-row items-center justify-between"
                      variants={itemVariants}
                    >
                      <div className="flex items-center gap-4 mb-4 sm:mb-0">
                        {item.image && (
                          <Image
                            src={item.image}
                            alt={item.name}
                            width={80}
                            height={80}
                            className="rounded-md object-cover"
                            data-ai-hint={item.name}
                          />
                        )}
                        <div>
                          <p className="font-semibold">{item.name}</p>
                          <p className="text-sm text-muted-foreground">
                            ${item.price.toFixed(2)}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                            disabled={item.quantity <= 1}
                          >
                            -
                          </Button>
                          <Input
                            type="number"
                            value={item.quantity}
                            onChange={(e) =>
                              updateQuantity(
                                item.id,
                                parseInt(e.target.value, 10)
                              )
                            }
                            className="w-16 h-8 text-center"
                          />
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                          >
                            +
                          </Button>
                        </div>
                        <p className="font-semibold w-20 text-right">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-destructive hover:text-destructive/80"
                          onClick={() => removeItem(item.id)}
                        >
                          <Trash2 className="w-5 h-5" />
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader>
                <CardTitle>Bestellübersicht</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <p>Zwischensumme</p>
                  <p>${subtotal.toFixed(2)}</p>
                </div>
                <div className="flex justify-between">
                  <p>Versand</p>
                  <p>${shipping.toFixed(2)}</p>
                </div>
                <Separator />
                <div className="flex justify-between font-bold text-lg">
                  <p>Gesamt</p>
                  <p>${total.toFixed(2)}</p>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" asChild>
                  <Link href="/checkout">Zur Kasse gehen</Link>
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
}
