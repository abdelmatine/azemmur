
'use client';

import { Card, CardContent } from '../ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '../ui/carousel';
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar';
import { Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { useEffect, useState, useCallback, useRef } from 'react';
import { testimonials as initialTestimonials, Testimonial } from '../../data/testimonials';
import { Skeleton } from '../ui/skeleton';
import { cn } from '../../lib/utils';
import Autoplay from 'embla-carousel-autoplay';

const TestimonialSkeleton = () => (
    <Card className="h-full shadow-lg">
        <CardContent className="flex flex-col items-center justify-center p-8 text-center h-full">
            <Skeleton className="w-20 h-20 rounded-full mb-4" />
            <div className="flex items-center gap-1 mb-2">
                <Skeleton className="w-24 h-5" />
            </div>
            <div className="space-y-2 flex-grow w-full">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
            <Skeleton className="h-6 w-1/2 mt-4" />
        </CardContent>
    </Card>
)


export function Testimonials() {
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
    const [loading, setLoading] = useState(true);
    const [api, setApi] = useState<CarouselApi>()
    const [current, setCurrent] = useState(0)
    const [count, setCount] = useState(0)
    const autoplayPlugin = useRef(
      Autoplay({ delay: 5000, stopOnInteraction: true })
    );

    useEffect(() => {
        // Simulate API fetch
        setLoading(true);
        setTimeout(() => {
            setTestimonials(initialTestimonials);
            setLoading(false);
        }, 1500);
    }, []);

     useEffect(() => {
        if (!api) {
            return
        }

        setCount(api.scrollSnapList().length)
        setCurrent(api.selectedScrollSnap())

        api.on("select", () => {
            setCurrent(api.selectedScrollSnap())
        })
    }, [api])

    const scrollTo = useCallback((index: number) => {
        api?.scrollTo(index);
    }, [api]);


  return (
    <section className="py-20 sm:py-32 bg-secondary/50">
      <div className="container mx-auto px-4">
        <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5 }}
        >
          <h2 className="font-headline text-4xl md:text-5xl font-bold text-accent">
            Worte von unseren Kunden
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-foreground/80">
            Hören Sie, was andere Feinschmecker über ihre Olivare-Erfahrung sagen.
          </p>
        </motion.div>
        
        <Carousel
          setApi={setApi}
          plugins={[autoplayPlugin.current]}
          opts={{
            align: 'start',
            loop: true,
          }}
          className="w-full max-w-4xl mx-auto"
          onMouseEnter={autoplayPlugin.current.stop}
          onMouseLeave={autoplayPlugin.current.reset}
        >
          <CarouselContent>
            {loading ? (
                Array.from({length: 3}).map((_, index) => (
                    <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3 p-1">
                       <TestimonialSkeleton />
                    </CarouselItem>
                ))
            ) : (
                testimonials.map((testimonial, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                    <motion.div 
                        className="p-1 h-full group"
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 1, delay: index * 0.1 }}
                    >
                        <Card className="h-full shadow-lg transition-all duration-300 group-hover:scale-105 group-hover:shadow-2xl active:shadow-2xl">
                            <CardContent className="flex flex-col items-center justify-center p-8 text-center h-full">
                                <Avatar className="w-20 h-20 mb-4 border-4 border-primary transition-all duration-300 group-hover:shadow-[0_0_20px_hsl(var(--primary))]">
                                    <AvatarImage src={testimonial.image} alt={testimonial.name} data-ai-hint={testimonial.hint} />
                                    <AvatarFallback>{testimonial.avatar}</AvatarFallback>
                                </Avatar>
                                <div className="flex items-center gap-1 mb-2">
                                    {[...Array(Math.round(testimonial.rating))].map((_, i) => (
                                    <Star key={i} className="w-5 h-5 text-primary fill-primary transition-all duration-300 group-hover:[filter:drop-shadow(0_0_5px_hsl(var(--primary)))]" />
                                    ))}
                                </div>
                                <blockquote className="text-lg font-medium text-foreground italic mb-4 flex-grow">
                                    "{testimonial.quote}"
                                </blockquote>
                                <p className="font-headline text-xl font-semibold text-accent">
                                    - {testimonial.name}
                                </p>
                            </CardContent>
                        </Card>
                    </motion.div>
                </CarouselItem>
                ))
            )}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
        <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: count }).map((_, index) => (
                <button
                    key={index}
                    onClick={() => scrollTo(index)}
                    className={cn(
                        "h-2 w-2 rounded-full transition-all",
                        current === index ? "w-4 bg-primary" : "bg-primary/30"
                    )}
                    aria-label={`Gehe zu Folie ${index + 1}`}
                />
            ))}
        </div>
      </div>
    </section>
  );
}
