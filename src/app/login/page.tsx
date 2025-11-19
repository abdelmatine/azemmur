
'use client';

import { useState } from 'react';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Lock, AtSign, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useToast } from '../../hooks/use-toast';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../hooks/use-auth';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const { login, googleLogin } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast({ title: "Fehler", description: "Bitte füllen Sie alle Felder aus.", variant: "destructive" });
      return;
    }
    setIsLoading(true);
    try {
      const success = await login(email, password);
      if (success) {
        toast({ title: "Erfolg", description: "Erfolgreich angemeldet." });
        router.push('/');
      } else {
        toast({ title: "Anmeldung fehlgeschlagen", description: "Ungültige E-Mail oder Passwort.", variant: "destructive" });
      }
    } catch (error: any) {
      toast({ title: "Anmeldung fehlgeschlagen", description: error.message, variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsGoogleLoading(true);
    try {
      await googleLogin();
      toast({ title: "Erfolg", description: "Erfolgreich mit Google angemeldet." });
      router.push('/');
    } catch (error: any) {
      toast({ title: "Google-Anmeldung fehlgeschlagen", description: error.message, variant: "destructive" });
    } finally {
      setIsGoogleLoading(false);
    }
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
          ease: 'easeOut'
      }
    },
  };

  return (
    <motion.div 
      className="container mx-auto py-24 md:py-32 pt-32 flex items-center justify-center"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div variants={itemVariants}>
        <Card className="w-full max-w-md shadow-2xl">
            <CardHeader className="text-center">
                <CardTitle className="font-headline text-4xl md:text-5xl">Willkommen zurück</CardTitle>
                <CardDescription>Melden Sie sich an, um Ihre Reise mit Olivare fortzusetzen.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-6">
                <div className="space-y-2">
                    <Label htmlFor="email">E-Mail</Label>
                    <div className="relative">
                        <AtSign className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input id="email" type="email" placeholder="sie@beispiel.com" className="pl-10" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                     <p className="text-xs text-muted-foreground">Testbenutzer: admin@example.com (pw: adminpassword) oder user@example.com (pw: userpassword)</p>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="password">Passwort</Label>
                     <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input id="password" type="password" placeholder="••••••••" className="pl-10" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                </div>
                 <Button type="submit" className="w-full" disabled={isLoading || isGoogleLoading}>
                  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Anmelden
                </Button>
              </form>
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
                <div className="relative w-full">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">
                      Oder weiter mit
                    </span>
                  </div>
                </div>
                 <Button variant="outline" className="w-full" onClick={handleGoogleSignIn} disabled={isLoading || isGoogleLoading}>
                  {isGoogleLoading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <svg className="mr-2 h-4 w-4" viewBox="0 0 48 48">
                      <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z" />
                      <path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C16.318 4 9.656 8.337 6.306 14.691z" />
                      <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.211 35.091 26.715 36 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z" />
                      <path fill="#1976D2" d="M43.611 20.083H24v8h11.303c-.792 2.237-2.231 4.166-4.087 5.571l6.19 5.238C43.021 36.697 44 34.091 44 31c0-5.202-2.698-9.636-6.389-10.917z" />
                    </svg>
                  )}
                  Google
                </Button>
                <p className="text-sm text-center text-muted-foreground">
                    Sie haben noch kein Konto?{' '}
                    <Link href="/signup" className="font-semibold text-primary hover:underline">
                        Registrieren
                    </Link>
                </p>
            </CardFooter>
        </Card>
      </motion.div>
    </motion.div>
  );
}
