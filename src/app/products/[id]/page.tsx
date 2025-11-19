
'use client'

import { Button } from '../../../components/ui/button';
import { Badge } from '../../../components/ui/badge';
import { Separator } from '../../../components/ui/separator';
import { ArrowRight, Star, Heart } from 'lucide-react';
import { useCartStore } from '../../../store/cart-slice';
import { useWishlistStore } from '../../../store/wishlist-slice';
import { useToast } from '../../../hooks/use-toast';
import { Product } from '../../../lib/products';
import { products as allProducts } from '../../../data/products';
import Link from 'next/link';
import { notFound, useParams } from 'next/navigation';
import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../../lib/utils';
import { ScrollArea, ScrollBar } from '../../../components/ui/scroll-area';
import { Skeleton } from '../../../components/ui/skeleton';
import { Review, initialReviews } from '../../../data/reviews';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '../../../components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '../../../components/ui/avatar';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../../../components/ui/form';
import { Textarea } from '../../../components/ui/textarea';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '../../../components/ui/input';
import Image from 'next/image';


const reviewSchema = z.object({
    rating: z.number().min(1, "Bitte wählen Sie eine Bewertung.").max(5),
    comment: z.string().min(10, "Die Bewertung muss mindestens 10 Zeichen lang sein."),
    name: z.string().min(2, "Bitte geben Sie Ihren Namen ein."),
});
type ReviewFormValues = z.infer<typeof reviewSchema>;


const ProductDetailSkeleton = () => (
    <div className="container mx-auto py-12 md:py-24 pt-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            <div className="space-y-4">
                 <Skeleton className="aspect-square w-full h-auto rounded-lg" />
                <div className="flex space-x-4">
                    <Skeleton className="w-24 h-24 rounded-lg" />
                    <Skeleton className="w-24 h-24 rounded-lg" />
                    <Skeleton className="w-24 h-24 rounded-lg" />
                </div>
            </div>
            <div className="space-y-6">
                <Skeleton className="h-6 w-1/4" />
                <Skeleton className="h-12 w-3/4" />
                <Skeleton className="h-8 w-1/3" />
                <Skeleton className="h-5 w-1/2" />
                <Separator />
                <Skeleton className="h-6 w-1/2 mb-4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Separator />
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-full" />
                <Button size="lg" className="w-full h-12" disabled />
            </div>
        </div>
    </div>
)

const RelatedProducts = ({ currentProductId }: { currentProductId: string }) => {
    const relatedProducts = allProducts
        .filter(p => p.id !== currentProductId)
        .sort(() => 0.5 - Math.random()) // Randomize
        .slice(0, 3); // Get 3
    
    if (relatedProducts.length === 0) return null;

    return (
        <div className="mt-24">
            <h2 className="font-headline text-3xl text-center mb-12 text-accent">Das könnte Ihnen auch gefallen</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                 {relatedProducts.map((product, index) => (
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
        </div>
    )
}


export default function ProductDetailPage() {
  const params = useParams();
  const productId = params.id as string;
  const { addItem } = useCartStore();
  const { items: wishlistItems, toggleWishlist } = useWishlistStore();
  const { toast } = useToast();

  const [product, setProduct] = useState<Product | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const form = useForm<ReviewFormValues>({
    resolver: zodResolver(reviewSchema),
    defaultValues: { rating: 0, comment: '', name: '' },
  });
  const [hoverRating, setHoverRating] = useState(0);

  const isInWishlist = useMemo(() => wishlistItems.some(item => item.id === productId), [wishlistItems, productId]);

  useEffect(() => {
    setLoading(true);
    // Simulate API call to fetch a single product and its reviews
    setTimeout(() => {
      const foundProduct = allProducts.find(p => p.id === productId);
      const foundReviews = initialReviews.filter(r => r.productId === productId);

      if (foundProduct) {
        setProduct(foundProduct);
        setReviews(foundReviews);
        if (foundProduct.images && foundProduct.images.length > 0) {
            setSelectedImage(foundProduct.images[0].src);
        }
      } else {
        notFound();
      }
      setLoading(false);
    }, 500);
  }, [productId]);


  const handleAddToCart = () => {
    if (!product || !product.images[0]?.src) return;
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

  const handleWishlistToggle = () => {
    if (!product || !product.images[0]?.src) return;
    const wishlistItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0].src,
    };
    toggleWishlist(wishlistItem);
    toast({
      title: isInWishlist ? "Von der Wunschliste entfernt" : "Zur Wunschliste hinzugefügt",
      description: `${product.name} wurde von Ihrer Wunschliste ${isInWishlist ? 'entfernt' : 'hinzugefügt'}.`,
    });
  };

  const handleReviewSubmit = (values: ReviewFormValues) => {
    const newReview: Review = {
        id: `rev-${Date.now()}`,
        productId: productId,
        author: values.name,
        avatar: `https://ui-avatars.com/api/?name=${values.name.replace(' ', '+')}&background=random`,
        rating: values.rating,
        comment: values.comment,
        date: new Date().toISOString(),
    };
    // Simulate API call to post a new review
    setReviews(prevReviews => [newReview, ...prevReviews]);
    toast({
      title: "Bewertung übermittelt!",
      description: "Vielen Dank für Ihr Feedback.",
    });
    form.reset();
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        duration: 0.7
      },
    },
  };
  
  const averageRating = useMemo(() => {
    if (reviews.length === 0) return product?.rating || 0;
    const total = reviews.reduce((acc, review) => acc + review.rating, 0);
    return total / reviews.length;
  }, [reviews, product?.rating]);

  if (loading) {
    return <ProductDetailSkeleton />;
  }

  if (!product) {
    return null;
  }

  return (
    <motion.div 
        className="container mx-auto py-12 md:py-24 pt-32"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
    >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
            <div className="space-y-4">
                <div className="relative group aspect-square rounded-lg bg-card flex items-center justify-center overflow-hidden shadow-lg">
                    {selectedImage ? (
                        <Image
                            src={selectedImage}
                            alt={product.name}
                            className="object-cover w-full h-full"
                            data-ai-hint={product.images.find(img => img.src === selectedImage)?.hint}
                            width={800}
                            height={800}
                            priority
                        />
                    ) : (
                        <Skeleton className="w-full h-full" />
                    )}
                </div>
                <ScrollArea>
                    <div className="flex space-x-4 pb-4">
                        {product.images.map((image, index) => (
                            <button
                                key={index}
                                onClick={() => setSelectedImage(image.src)}
                                className={cn(
                                    "relative group flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all w-24 h-24",
                                    selectedImage === image.src ? "border-primary shadow-lg" : "border-transparent hover:border-primary/50"
                                )}
                            >
                                <Image
                                    src={image.src}
                                    alt={image.hint}
                                    className="object-cover w-full h-full"
                                    data-ai-hint={image.hint}
                                    width={100}
                                    height={100}
                                />
                            </button>
                        ))}
                    </div>
                    <ScrollBar orientation="horizontal" />
                </ScrollArea>
            </div>
            <div className="space-y-6">
                <div className="space-y-2">
                    <Badge variant="outline">{product.category}</Badge>
                    <h1 className="font-headline text-4xl md:text-5xl font-bold text-accent">
                    {product.name}
                    </h1>
                    <p className="text-2xl font-semibold text-accent-foreground">${product.price.toFixed(2)}</p>
                    <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`w-5 h-5 ${i < Math.round(averageRating) ? 'text-accent fill-accent' : 'text-muted-foreground/30 fill-muted-foreground/30'}`} />
                        ))}
                        <span className="text-sm text-muted-foreground ml-2">({reviews.length} Bewertungen)</span>
                    </div>
                </div>
                <Separator />
                <div className="space-y-4 text-foreground/80">
                    <h2 className="text-xl font-headline font-semibold text-primary">{product.shortDescription}</h2>
                    <p>
                    {product.longDescription}
                    </p>
                </div>
                <Separator />
                <div className="space-y-2">
                    <p><span className="font-semibold text-primary">Herkunft:</span> {product.details.origin}</p>
                    <p><span className="font-semibold text-primary">Säuregehalt:</span> {product.details.acidity}</p>
                    <p><span className="font-semibold text-primary">Geschmacksnoten:</span> {product.details.tastingNotes}</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Button size="lg" className="w-full" onClick={handleAddToCart} data-no-loader>In den Warenkorb</Button>
                    <Button size="lg" variant="outline" className="w-full" onClick={handleWishlistToggle} data-no-loader>
                        <Heart className={cn("w-5 h-5 mr-2", isInWishlist && "fill-primary")} />
                        {isInWishlist ? 'Von der Wunschliste entfernen' : 'Zur Wunschliste hinzufügen'}
                    </Button>
                </div>
            </div>
        </div>

        <motion.div className="mt-24" variants={containerVariants}>
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-3xl">Kundenbewertungen</CardTitle>
                </CardHeader>
                <CardContent className="space-y-12">
                     <Form {...form}>
                        <form onSubmit={form.handleSubmit(handleReviewSubmit)} className="space-y-6 p-4 border rounded-lg">
                            <h3 className="font-headline text-xl">Eine Bewertung hinterlassen</h3>
                             <FormField
                                control={form.control}
                                name="rating"
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel>Ihre Bewertung</FormLabel>
                                    <FormControl>
                                        <div className="flex items-center gap-1" onMouseLeave={() => setHoverRating(0)}>
                                            {[1, 2, 3, 4, 5].map((star) => (
                                            <Star
                                                key={star}
                                                className={cn(
                                                'w-6 h-6 cursor-pointer transition-colors',
                                                (hoverRating || field.value) >= star ? 'text-accent fill-accent' : 'text-muted-foreground/30'
                                                )}
                                                onMouseEnter={() => setHoverRating(star)}
                                                onClick={() => field.onChange(star)}
                                            />
                                            ))}
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                    </FormItem>
                                )}
                            />
                             <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel>Ihr Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="z.B. Jane Doe" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="comment"
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel>Ihre Bewertung</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Teilen Sie Ihre Gedanken zu diesem Produkt..." {...field} rows={4} />
                                    </FormControl>
                                    <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit">Bewertung abschicken</Button>
                        </form>
                    </Form>
                    <div className="space-y-8">
                        {reviews.length > 0 ? (
                            reviews.map(review => (
                                <div key={review.id} className="flex gap-4">
                                    <Avatar>
                                        <AvatarImage src={review.avatar} alt={review.author} />
                                        <AvatarFallback>{review.author.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between">
                                            <p className="font-semibold">{review.author}</p>
                                            <div className="flex items-center gap-1">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'text-accent fill-accent' : 'text-muted-foreground/30'}`} />
                                                ))}
                                            </div>
                                        </div>
                                        <p className="text-sm text-muted-foreground">{new Date(review.date).toLocaleDateString()}</p>
                                        <p className="mt-2 text-foreground/90">{review.comment}</p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-muted-foreground text-center py-8">Seien Sie der Erste, der dieses Produkt bewertet!</p>
                        )}
                    </div>
                </CardContent>
            </Card>
        </motion.div>
        
        <RelatedProducts currentProductId={productId} />

    </motion.div>
  );
}
