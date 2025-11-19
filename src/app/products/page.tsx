

'use client';

import { useState, useEffect, useMemo, Suspense } from 'react';
import { Button } from '../../components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../../components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/select';
import { Badge } from '../../components/ui/badge';
import { ShoppingCart, Star, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { products as allProducts } from '../../data/products';
import { Product } from '../../lib/products';
import Link from 'next/link';
import { useCartStore } from '../../store/cart-slice';
import { useWishlistStore } from '../../store/wishlist-slice';
import { useToast } from '../../hooks/use-toast';
import { Slider } from '../../components/ui/slider';
import { Label } from '../../components/ui/label';
import { Skeleton } from '../../components/ui/skeleton';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebounce } from 'use-debounce';
import Image from 'next/image';
import { cn } from '../../lib/utils';


const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
        duration: 0.5,
        ease: 'easeOut'
    }
  },
};

const ProductSkeleton = () => (
  <Card className="h-full flex flex-col overflow-hidden">
    <Skeleton className="aspect-[4/5] w-full" />
    <CardContent className="pt-6 flex-grow space-y-2">
      <Skeleton className="h-6 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
      <Skeleton className="h-5 w-1/4" />
    </CardContent>
    <CardFooter className="flex gap-2">
      <Skeleton className="h-10 w-full" />
      <Skeleton className="h-10 w-10" />
    </CardFooter>
  </Card>
);

const PRODUCTS_PER_PAGE = 6;

function ProductsView() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();

    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState<Product[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const [visibleCount, setVisibleCount] = useState(PRODUCTS_PER_PAGE);

    const filters = useMemo(() => ({
        category: searchParams.get('category') || 'all',
        intensity: searchParams.get('intensity') || 'all',
        price: [
            Number(searchParams.get('minPrice') || 0),
            Number(searchParams.get('maxPrice') || 100)
        ]
    }), [searchParams]);
    
    const [priceRange, setPriceRange] = useState<[number, number]>(filters.price as [number, number]);
    const [debouncedPriceRange] = useDebounce(priceRange, 500);

    const { addItem } = useCartStore();
    const { items: wishlistItems, toggleWishlist } = useWishlistStore();
    const { toast } = useToast();
    
    useEffect(() => {
        setLoading(true);
        // Simulate API fetch
        setTimeout(() => {
          setProducts(allProducts);
          setLoading(false);
        }, 1000);
    }, []);

    useEffect(() => {
        const filtered = products.filter((product) => {
            const categoryMatch = filters.category === 'all' || product.category === filters.category;
            const intensityMatch = filters.intensity === 'all' || product.intensity === filters.intensity;
            const priceMatch = product.price >= filters.price[0] && product.price <= filters.price[1];
            return categoryMatch && intensityMatch && priceMatch;
        });
        setFilteredProducts(filtered);
        setVisibleCount(PRODUCTS_PER_PAGE); // Reset pagination on filter change
    }, [filters, products]);
    
    useEffect(() => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('minPrice', debouncedPriceRange[0].toString());
        params.set('maxPrice', debouncedPriceRange[1].toString());
        router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    }, [debouncedPriceRange, pathname, router, searchParams]);

  
    const handleFilterChange = (filterType: string) => (value: string) => {
        const params = new URLSearchParams(searchParams.toString());
        if (value === 'all') {
            params.delete(filterType);
        } else {
            params.set(filterType, value);
        }
        router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    };

    const handleAddToCart = (e: React.MouseEvent, product: Product) => {
      e.preventDefault();
      e.stopPropagation();
      if (!product.images[0]?.src) return;
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images[0].src,
      });
      toast({
        title: "Zum Warenkorb hinzugefügt!",
        description: `${product.name} wurde Ihrem Warenkorb hinzugefügt.`,
      })
    };

     const handleWishlistToggle = (e: React.MouseEvent, product: Product) => {
        e.preventDefault();
        e.stopPropagation();
        if (!product.images[0]?.src) return;
        
        const wishlistItem = {
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.images[0].src,
        };

        toggleWishlist(wishlistItem);
        
        const isInWishlist = wishlistItems.some(item => item.id === product.id);
        toast({
            title: isInWishlist ? "Von der Wunschliste entfernt" : "Zur Wunschliste hinzugefügt",
            description: `${product.name} wurde ${isInWishlist ? 'von Ihrer Wunschliste entfernt' : 'zu Ihrer Wunschliste hinzugefügt'}.`,
        });
    };

    const loadMore = () => {
      setVisibleCount(prevCount => prevCount + PRODUCTS_PER_PAGE);
    };

    const displayProducts = filteredProducts.slice(0, visibleCount);
  
    return (
        <motion.div 
          className="container mx-auto py-12 md:py-24 pt-32"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
        <motion.div className="text-center mb-12" variants={itemVariants}>
          <h1 className="font-headline text-4xl md:text-5xl font-bold text-accent">
            Unsere Kollektion
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-foreground/80">
            Entdecken Sie unser Sortiment an Premium-Olivenölen, jedes mit einem einzigartigen Charakter.
          </p>
        </motion.div>
  
        <motion.div className="flex flex-col md:flex-row gap-8 mb-12" variants={itemVariants}>
          <div className="w-full md:w-1/4">
            <Card>
              <CardHeader>
                <CardTitle>Filter</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label>Kategorie</Label>
                  <Select onValueChange={handleFilterChange('category')} defaultValue={filters.category}>
                    <SelectTrigger>
                      <SelectValue placeholder="Nach Kategorie filtern" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Alle Kategorien</SelectItem>
                      <SelectItem value="Mischung">Mischung</SelectItem>
                      <SelectItem value="Sortenrein">Sortenrein</SelectItem>
                      <SelectItem value="Aromatisiert">Aromatisiert</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Intensität</Label>
                  <Select onValueChange={handleFilterChange('intensity')} defaultValue={filters.intensity}>
                    <SelectTrigger>
                      <SelectValue placeholder="Nach Intensität filtern" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Alle Intensitäten</SelectItem>
                      <SelectItem value="Mild">Mild</SelectItem>
                      <SelectItem value="Mittel">Mittel</SelectItem>
                      <SelectItem value="Robust">Robust</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                 <div>
                    <Label>Preisspanne</Label>
                    <div className="flex justify-between text-sm text-muted-foreground">
                        <span>${priceRange[0]}</span>
                        <span>${priceRange[1]}</span>
                    </div>
                    <Slider
                        min={0}
                        max={100}
                        step={1}
                        value={priceRange}
                        onValueChange={(value) => setPriceRange(value as [number, number])}
                        className="mt-2"
                    />
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="w-full md:w-3/4">
            <div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            >
                {loading ? (
                Array.from({length: 6}).map((_, i) => <ProductSkeleton key={i} />)
                ) : (
                displayProducts.map((product) => (
                    <motion.div 
                        key={product.id}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.5 }}
                    >
                        <Card className="h-full flex flex-col overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group">
                        <CardHeader className="p-0">
                            <Link href={`/products/${product.id}`} passHref className="block overflow-hidden aspect-[4/5] relative">
                                <Image
                                    src={product.images[0].src}
                                    alt={product.name}
                                    className="object-cover w-full h-full cursor-pointer transition-transform duration-500 group-hover:scale-105"
                                    data-ai-hint={product.images[0].hint}
                                    width={600}
                                    height={800}
                                />
                                <Badge variant="secondary" className="absolute top-2 left-2">{product.category}</Badge>
                                <Button 
                                    variant="ghost" 
                                    size="icon" 
                                    className="absolute top-2 right-2 rounded-full bg-background/50 backdrop-blur-sm text-primary hover:bg-background/70"
                                    onClick={(e) => handleWishlistToggle(e, product)}
                                    data-no-loader
                                >
                                    <Heart className={cn("w-5 h-5", wishlistItems.some(item => item.id === product.id) && "fill-primary")} />
                                </Button>
                            </Link>
                        </CardHeader>
                        <CardContent className="pt-6 flex-grow">
                            <CardTitle className="font-headline text-xl h-16">
                                <Link href={`/products/${product.id}`} passHref>
                                    {product.name}
                                </Link>
                            </CardTitle>
                            <div className="flex items-center gap-1 mt-2">
                            {[...Array(5)].map((_, i) => (
                                <Star
                                key={i}
                                className={`w-4 h-4 ${
                                    i < product.rating
                                    ? 'text-accent fill-accent'
                                    : 'text-muted-foreground/30'
                                }`}
                                />
                            ))}
                            <span className="text-xs text-muted-foreground ml-1">
                                ({product.reviews} Bewertungen)
                            </span>
                            </div>
                            <p className="text-lg font-semibold text-primary mt-2">${product.price.toFixed(2)}</p>
                        </CardContent>
                        <CardFooter className="flex gap-2">
                            <Button asChild className="w-full">
                                <Link href={`/products/${product.id}`}>Details anzeigen</Link>
                            </Button>
                            <Button variant="outline" size="icon" onClick={(e) => handleAddToCart(e, product)} data-no-loader>
                                <ShoppingCart className="w-4 h-4" />
                            </Button>
                        </CardFooter>
                        </Card>
                    </motion.div>
                ))
                )}
            </div>
            { !loading && displayProducts.length === 0 && (
                <div className="col-span-full text-center py-12">
                    <p className="text-lg text-muted-foreground">Keine Produkte entsprechen Ihren Filtern.</p>
                </div>
            )}
            { !loading && filteredProducts.length > visibleCount && (
              <div className="text-center mt-12">
                <Button onClick={loadMore} size="lg">
                    Mehr laden
                </Button>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    );
}

export default function ProductsPage() {
    return (
        <Suspense fallback={<div>Wird geladen...</div>}>
            <ProductsView />
        </Suspense>
    );
}
