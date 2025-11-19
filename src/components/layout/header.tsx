"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { IconButton } from "../ui/icon-button";
import {
  ShoppingCart,
  Menu,
  LogIn,
  LogOut,
  User,
  Sun,
  Moon,
  LayoutDashboard,
  ShoppingBag,
  Heart,
  UserCog,
} from "lucide-react";
import { ThemeToggle } from "../theme-toggle";
import { useCartStore } from "../../store/cart-slice";
import { useWishlistStore } from "../../store/wishlist-slice";
import { cn } from "../../lib/utils";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "../ui/sheet";
import { useAuth } from "../../hooks/use-auth";
import { useToast } from "../../hooks/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Separator } from "../ui/separator";
import { ScrollArea } from "../ui/scroll-area";
import { useTheme } from "next-themes";
import Image from "next/image";
import { Logo } from "./logo";

const navLinks = [
  { href: "/", label: "Startseite" },
  { href: "/story", label: "Geschichte" },
  { href: "/products", label: "Produkte" },
  { href: '/contact', label: 'Kontakt' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.4,
    },
  },
};

const letterVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: { opacity: 1, x: 0 },
};

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { items: cartItems } = useCartStore();
  const { items: wishlistItems } = useWishlistStore();
  const { user, isAdmin, loading, logout } = useAuth();
  const { toast } = useToast();
  const router = useRouter();
  const { theme, setTheme } = useTheme();

  const totalCartItems = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );
  const totalWishlistItems = wishlistItems.length;
  const hasWishlistItems = totalWishlistItems > 0;
  const hasCartItems = totalCartItems > 0;

  useEffect(() => {
    setHasMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSignOut = async () => {
    try {
      await logout();
      toast({ title: "Erfolg", description: "Erfolgreich abgemeldet." });
      router.push("/");
    } catch (error: any) {
      toast({
        title: "Abmeldung fehlgeschlagen",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const getInitials = (name: string | null | undefined) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .substring(0, 2)
      .toUpperCase();
  };

  const handleThemeToggle = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <nav
        className={cn(
          "container relative flex h-16 items-center justify-between transition-all duration-300"
        )}
      >
        {/* Logo */}
        <div>
          <div
            className={cn(
              "p-2 rounded-full transition-all duration-300",
              hasMounted && isScrolled
                ? "bg-background/80 backdrop-blur-sm shadow-lg"
                : "bg-transparent"
            )}
          >
            <Link
              href="/"
              className={cn(
                "flex items-center space-x-2 transition-shadow duration-300 rounded-full"
              )}
            >
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Logo size={10} />
              </motion.div>
              <motion.div
                className="flex overflow-hidden"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {"Azemmur".split("").map((char, index) => (
                  <motion.span
                    key={index}
                    variants={letterVariants}
                    className="text-lg font-headline font-bold text-primary"
                  >
                    {char}
                  </motion.span>
                ))}
              </motion.div>
            </Link>
          </div>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center justify-center absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <div
            className={cn(
              "flex items-center gap-1 rounded-full p-1 transition-all duration-300",
              hasMounted && isScrolled
                ? "bg-background/80 backdrop-blur-md shadow-lg"
                : "bg-transparent"
            )}
          >
            {navLinks.map((link) => (
              <Button
                key={link.href}
                variant="ghost"
                asChild
                size="sm"
                className={cn(
                  "transition-colors rounded-full text-primary px-3 py-1",
                  "dark:text-foreground",
                  pathname === link.href
                    ? "bg-primary text-primary-foreground hover:bg-primary/90 dark:bg-primary dark:text-primary-foreground dark:hover:bg-primary/90"
                    : "hover:bg-primary/10 dark:hover:bg-white/10"
                )}
              >
                <Link href={link.href}>{link.label}</Link>
              </Button>
            ))}
          </div>
        </div>

        {/* Mobile Menu Trigger */}
        <div className="md:hidden">
          <motion.div
            className={cn(
              "p-1 rounded-full transition-all duration-300",
              hasMounted && isScrolled
                ? "bg-background/80 backdrop-blur-sm shadow-lg"
                : "bg-transparent"
            )}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Menu />
                  <span className="sr-only">Menü öffnen</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="flex flex-col p-0">
                <SheetHeader className="p-6 pb-0">
                  <Link
                    href="/"
                    className="flex items-center space-x-2 mb-4"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Logo size={10} />
                    <span className="text-lg font-headline font-bold text-primary">
                      Olivare
                    </span>
                  </Link>
                  <SheetTitle className="sr-only">Mobiles Menü</SheetTitle>
                </SheetHeader>
                <ScrollArea className="flex-grow">
                  <motion.div
                    className="flex flex-col space-y-4 p-6"
                    variants={containerVariants}
                    initial="hidden"
                    animate={isMobileMenuOpen ? "visible" : "hidden"}
                  >
                    {navLinks.map((link) => (
                      <motion.div key={link.href} variants={letterVariants}>
                        <Button
                          variant={pathname === link.href ? "default" : "ghost"}
                          asChild
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="justify-start text-base py-4 w-full"
                        >
                          <Link href={link.href}>{link.label}</Link>
                        </Button>
                      </motion.div>
                    ))}

                    <Separator className="my-4" />

                    <motion.div variants={letterVariants} className="space-y-2">
                      <SheetClose asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start"
                          asChild
                        >
                          <Link href="/cart">
                            <ShoppingCart className="mr-2 h-4 w-4" />
                            Warenkorb{" "}
                            {hasMounted &&
                              totalCartItems > 0 &&
                              `(${totalCartItems})`}
                          </Link>
                        </Button>
                      </SheetClose>
                      <SheetClose asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start"
                          asChild
                        >
                          <Link href="/wishlist">
                            <Heart className="mr-2 h-4 w-4" />
                            Wunschliste{" "}
                            {hasMounted &&
                              totalWishlistItems > 0 &&
                              `(${totalWishlistItems})`}
                          </Link>
                        </Button>
                      </SheetClose>
                    </motion.div>

                    <motion.div
                      variants={letterVariants}
                      className="flex items-center justify-between gap-2"
                    >
                      {user ? (
                        <SheetClose asChild>
                          <div className="flex-grow">
                            <div className="flex items-center gap-2 p-2 rounded-md hover:bg-muted w-full">
                              <Avatar className="h-9 w-9">
                                <AvatarImage
                                  src={user.photoURL ?? ""}
                                  alt={user.displayName ?? "Benutzer"}
                                />
                                <AvatarFallback>
                                  {getInitials(user.displayName)}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="text-sm font-medium leading-none">
                                  {user.displayName}
                                </p>
                                <p className="text-xs leading-none text-muted-foreground">
                                  {user.email}
                                </p>
                              </div>
                            </div>
                          </div>
                        </SheetClose>
                      ) : (
                        <SheetClose asChild>
                          <Button asChild className="flex-grow">
                            <Link href="/login">
                              <LogIn className="mr-2 h-4 w-4" />
                              Anmelden
                            </Link>
                          </Button>
                        </SheetClose>
                      )}
                      <div
                        className="rounded-md p-2 hover:bg-muted text-left cursor-pointer"
                        onClick={handleThemeToggle}
                      >
                        <span className="sr-only">Thema wechseln</span>
                        <div className="pointer-events-none">
                          <ThemeToggle />
                        </div>
                      </div>
                    </motion.div>

                    {user ? (
                      <>
                        {isAdmin ? (
                          <motion.div variants={letterVariants}>
                            <SheetClose asChild>
                              <Button
                                variant="ghost"
                                className="w-full justify-start"
                                asChild
                              >
                                <Link href="/admin">
                                  <LayoutDashboard className="mr-2 h-4 w-4" />
                                  <span>Admin</span>
                                </Link>
                              </Button>
                            </SheetClose>
                          </motion.div>
                        ) : (
                          <>
                            <motion.div variants={letterVariants}>
                              <SheetClose asChild>
                                <Button
                                  variant="ghost"
                                  className="w-full justify-start"
                                  asChild
                                >
                                  <Link href="/profile/orders">
                                    <ShoppingBag className="mr-2 h-4 w-4" />
                                    <span>Meine Bestellungen</span>
                                  </Link>
                                </Button>
                              </SheetClose>
                            </motion.div>
                            <motion.div variants={letterVariants}>
                              <SheetClose asChild>
                                <Button
                                  variant="ghost"
                                  className="w-full justify-start"
                                  asChild
                                >
                                  <Link href="/profile/details">
                                    <UserCog className="mr-2 h-4 w-4" />
                                    <span>Meine Daten</span>
                                  </Link>
                                </Button>
                              </SheetClose>
                            </motion.div>
                          </>
                        )}
                        <motion.div variants={letterVariants}>
                          <SheetClose asChild>
                            <Button
                              variant="ghost"
                              onClick={handleSignOut}
                              className="w-full justify-start"
                            >
                              <LogOut className="mr-2 h-4 w-4" />
                              <span>Abmelden</span>
                            </Button>
                          </SheetClose>
                        </motion.div>
                      </>
                    ) : null}
                  </motion.div>
                </ScrollArea>
              </SheetContent>
            </Sheet>
          </motion.div>
        </div>

        {/* Actions */}
        <div className="hidden md:flex items-center justify-end space-x-2">
          <div
            className={cn(
              "p-1 rounded-full transition-all duration-300 h-8 w-8 flex items-center justify-center",
              hasMounted && isScrolled
                ? "bg-background/80 backdrop-blur-sm shadow-lg"
                : "bg-transparent"
            )}
          >
            <ThemeToggle />
          </div>
          <div
            className={cn(
              "p-1 rounded-full transition-all duration-300",
              hasMounted && isScrolled
                ? "bg-background/80 backdrop-blur-sm shadow-lg"
                : "bg-transparent"
            )}
          >
            <IconButton asChild>
              <Link href="/cart">
                <ShoppingCart
                  className={cn(hasMounted && hasCartItems && "fill-primary")}
                />
                {hasMounted && totalCartItems > 0 && (
                  <motion.span
                    className="absolute -top-0.5 -right-0.5 bg-primary text-primary-foreground text-[10px] rounded-full w-4 h-4 flex items-center justify-center"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    {totalCartItems}
                  </motion.span>
                )}
              </Link>
            </IconButton>
          </div>
          <div
            data-no-loader
            className={cn(
              "p-1 rounded-full transition-all duration-300",
              hasMounted && isScrolled
                ? "bg-background/80 backdrop-blur-sm shadow-lg"
                : "bg-transparent"
            )}
          >
            <IconButton asChild>
              <Link href="/wishlist">
                <Heart
                  className={cn(
                    hasMounted && hasWishlistItems && "fill-primary"
                  )}
                />
                {hasMounted && totalWishlistItems > 0 && (
                  <motion.span
                    className="absolute -top-0.5 -right-0.5 bg-primary text-primary-foreground text-[10px] rounded-full w-4 h-4 flex items-center justify-center"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    {totalWishlistItems}
                  </motion.span>
                )}
              </Link>
            </IconButton>
          </div>
          <div
            className={cn(
              "rounded-full transition-shadow duration-300",
              hasMounted && isScrolled ? "shadow-lg" : ""
            )}
          >
            {loading ? (
              <div className="w-8 h-8 rounded-full bg-muted animate-pulse" />
            ) : user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <IconButton>
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        src={user.photoURL ?? ""}
                        alt={user.displayName ?? "User"}
                        className="h-8 w-8 object-cover rounded-full"
                      />
                      <AvatarFallback>
                        {getInitials(user.displayName)}
                      </AvatarFallback>
                    </Avatar>
                  </IconButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-44" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {user.displayName}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {isAdmin ? (
                    <DropdownMenuItem asChild>
                      <Link href="/admin">
                        <LayoutDashboard className="mr-2 h-4 w-4" />
                        <span>Admin</span>
                      </Link>
                    </DropdownMenuItem>
                  ) : (
                    <>
                      <DropdownMenuItem asChild>
                        <Link href="/profile/orders">
                          <ShoppingBag className="mr-2 h-4 w-4" />
                          <span>Meine Bestellungen</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/profile/details">
                          <UserCog className="mr-2 h-4 w-4" />
                          <span>Meine Daten</span>
                        </Link>
                      </DropdownMenuItem>
                    </>
                  )}
                  <DropdownMenuItem asChild>
                    <Link href="/wishlist">
                      <Heart className="mr-2 h-4 w-4" />
                      <span>Meine Wunschliste</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Abmelden</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button asChild className="rounded-full hidden lg:flex">
                <Link href="/login">
                  <LogIn className="mr-2 h-4 w-4" />
                  Anmelden
                </Link>
              </Button>
            )}
          </div>
        </div>
      </nav>
    </motion.header>
  );
}
