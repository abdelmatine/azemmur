
'use client';

import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../../components/ui/alert-dialog';
import { CreditCard, Lock, Milestone, Bitcoin, Wallet, CheckCircle, XCircle } from 'lucide-react';
import Link from 'next/link';
import { useCartStore } from '../../store/cart-slice';
import { useOrderStore } from '../../store/order-slice';
import { useRouter } from 'next/navigation';
import { useToast } from '../../hooks/use-toast';
import { motion } from 'framer-motion';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { countries } from '../../lib/countries';

const shippingSchema = z.object({
  firstName: z.string().min(1, 'Vorname ist erforderlich'),
  lastName: z.string().min(1, 'Nachname ist erforderlich'),
  address: z.string().min(1, 'Adresse ist erforderlich'),
  city: z.string().min(1, 'Stadt ist erforderlich'),
  zip: z.string().regex(/^[0-9]+$/, 'Postleitzahl muss numerisch sein'),
  country: z.string().min(1, 'Land ist erforderlich'),
});

type ShippingFormValues = z.infer<typeof shippingSchema>;

export default function CheckoutPage() {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [orderStatus, setOrderStatus] = useState<'success' | 'failure'>('failure');
  const { items: cartItems, clearCart } = useCartStore();
  const { addOrder } = useOrderStore();
  const router = useRouter();
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ShippingFormValues>({
    resolver: zodResolver(shippingSchema),
    defaultValues: {
      country: 'DE',
    }
  });

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = 5.0;
  const total = subtotal + shipping;

  const onSubmit: SubmitHandler<ShippingFormValues> = (data) => {
    // Simulate payment processing
    const isSuccess = Math.random() > 0.2; // 80% success rate

    if (isSuccess && cartItems.length > 0) {
      setOrderStatus('success');
      
      const newOrder = {
        id: `ORD-${Date.now()}`,
        date: new Date().toISOString(),
        customer: `${data.firstName} ${data.lastName}`,
        email: `user${Math.floor(Math.random() * 1000)}@example.com`, // Placeholder email
        total: total,
        status: 'Verarbeitung' as const,
        items: cartItems,
        shippingAddress: data,
      };
      addOrder(newOrder);

      toast({
        title: "Bestellung bestätigt!",
        description: "Ihre Zahlung war erfolgreich und Ihre Bestellung ist auf dem Weg.",
        variant: 'default',
        duration: 5000,
      });
      clearCart();
    } else {
      setOrderStatus('failure');
       toast({
        title: "Zahlung fehlgeschlagen",
        description: "Es gab ein Problem mit Ihrer Zahlung. Bitte versuchen Sie es erneut.",
        variant: "destructive",
        duration: 5000,
      });
    }
    setShowConfirmation(true);
  };

  const handleDialogClose = () => {
    setShowConfirmation(false);
    if (orderStatus === 'success') {
      router.push('/');
    }
  }

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
    <>
      <motion.div 
        className="container mx-auto py-24 md:py-32 pt-32"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div className="text-center mb-12" variants={itemVariants}>
          <h1 className="font-headline text-4xl md:text-5xl font-bold text-accent">
            Kasse
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-foreground/80">
            Schließen Sie Ihren Einkauf sicher ab.
          </p>
        </motion.div>

        <motion.form onSubmit={handleSubmit(onSubmit)} className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12" variants={itemVariants}>
          <Card>
            <CardHeader>
              <CardTitle>Versandinformationen</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">Vorname</Label>
                  <Input id="firstName" placeholder="John" {...register('firstName')} />
                  {errors.firstName && <p className="text-sm text-destructive">{errors.firstName.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Nachname</Label>
                  <Input id="lastName" placeholder="Doe" {...register('lastName')} />
                  {errors.lastName && <p className="text-sm text-destructive">{errors.lastName.message}</p>}
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Adresse</Label>
                <Input id="address" placeholder="Olivenhain 123" {...register('address')} />
                {errors.address && <p className="text-sm text-destructive">{errors.address.message}</p>}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-2 col-span-1 sm:col-span-2">
                  <Label htmlFor="city">Stadt</Label>
                  <Input id="city" placeholder="Berlin" {...register('city')} />
                  {errors.city && <p className="text-sm text-destructive">{errors.city.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="zip">PLZ</Label>
                  <Input id="zip" placeholder="10115" {...register('zip')} type="text" inputMode='numeric' />
                  {errors.zip && <p className="text-sm text-destructive">{errors.zip.message}</p>}
                </div>
              </div>
              <div className="space-y-2">
                  <Label>Land</Label>
                  <Select
                    onValueChange={(value) => (control as any)._formValues.country = value}
                    defaultValue={(control as any)._formValues.country}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Wählen Sie ein Land" />
                    </SelectTrigger>
                    <SelectContent>
                      {countries.map((country) => (
                        <SelectItem key={country.code} value={country.code}>{country.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.country && <p className="text-sm text-destructive">{errors.country.message}</p>}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">Zahlungsdetails</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="card" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="card"><CreditCard className="w-5 h-5"/></TabsTrigger>
                  <TabsTrigger value="paypal"><Wallet className="w-5 h-5"/></TabsTrigger>
                  <TabsTrigger value="crypto"><Bitcoin className="w-5 h-5"/></TabsTrigger>
                  <TabsTrigger value="cod"><Milestone className="w-5 h-5"/></TabsTrigger>
                </TabsList>
                <TabsContent value="card" className="mt-6 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="card-number">Kartennummer</Label>
                    <Input id="card-number" placeholder="•••• •••• •••• ••••" />
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2 col-span-2">
                      <Label htmlFor="expiry">Gültigkeitsdatum</Label>
                      <Input id="expiry" placeholder="MM / JJ" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cvc">CVC</Label>
                      <Input id="cvc" placeholder="123" />
                    </div>
                  </div>
                   <Button type="submit" className="w-full" size="lg">
                    <Lock className="w-4 h-4 mr-2" />
                    Sicher bezahlen
                  </Button>
                </TabsContent>
                 <TabsContent value="paypal" className="mt-6 text-center">
                    <p className="text-muted-foreground mb-4">Sie werden zu PayPal weitergeleitet, um Ihren Kauf abzuschließen.</p>
                    <Button type="submit" className="w-full" size="lg">
                      Weiter mit PayPal
                    </Button>
                </TabsContent>
                 <TabsContent value="crypto" className="mt-6 text-center">
                    <p className="text-muted-foreground mb-4">Wählen Sie Ihre Kryptowährung, um fortzufahren.</p>
                    <Button type="submit" className="w-full" size="lg">
                      Mit Krypto bezahlen
                    </Button>
                </TabsContent>
                 <TabsContent value="cod" className="mt-6 text-center">
                    <p className="text-muted-foreground mb-4">Sie können bei Lieferung Ihrer Bestellung bar bezahlen.</p>
                    <Button type="submit" className="w-full" size="lg">
                        Bestellung bestätigen
                    </Button>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </motion.form>
        <motion.div className="text-center mt-8" variants={itemVariants}>
          <Button variant="link" asChild>
            <Link href="/products">Weiter einkaufen</Link>
          </Button>
        </motion.div>
      </motion.div>

       <AlertDialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <AlertDialogContent>
          <AlertDialogHeader className="items-center text-center">
            {orderStatus === 'success' ? (
                <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                    <CheckCircle className="text-green-500 w-16 h-16" />
                </motion.div>
              ) : (
                <motion.div
                    initial={{ scale: 0.5, opacity: 0, rotate: 0 }}
                    animate={{ scale: 1, opacity: 1, rotate: [0, -10, 10, -10, 10, 0] }}
                    transition={{ duration: 0.5 }}
                >
                    <XCircle className="text-destructive w-16 h-16" />
                </motion.div>
              )}
            <AlertDialogTitle className="text-2xl font-bold">
              {orderStatus === 'success' ? 'Bestellung bestätigt!' : 'Zahlung fehlgeschlagen'}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {orderStatus === 'success'
                ? 'Vielen Dank für Ihren Einkauf! Eine Bestätigungs-E-Mail wurde an Sie gesendet.'
                : 'Bei der Verarbeitung Ihrer Zahlung ist ein Problem aufgetreten. Bitte überprüfen Sie Ihre Daten und versuchen Sie es erneut.'}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={handleDialogClose}>
              {orderStatus === 'success' ? 'Weiter einkaufen' : 'Erneut versuchen'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
