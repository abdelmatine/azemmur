
'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const letterVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
        opacity: 1, 
        y: 0,
        transition: {
            repeat: Infinity,
            repeatType: 'reverse',
            duration: 0.8,
            ease: 'easeInOut'
        }
    },
}

export default function PageLoader() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  // Handle hiding the loader after the initial page load
  useEffect(() => {
    if (isInitialLoad) {
      // Use a timeout to ensure the animation is visible on first load
      const timer = setTimeout(() => {
        setLoading(false);
        setIsInitialLoad(false);
      }, 1000); // Adjust delay as needed
      return () => clearTimeout(timer);
    }
  }, [isInitialLoad]);
  
  // Handle triggering the loader on subsequent client-side navigations
  useEffect(() => {
    const handleLinkClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Find the closest 'a' tag, but don't trigger if it's inside a component that handles its own state (like wishlist/cart buttons)
      const anchor = target.closest('a');
      const selfManaged = target.closest('[data-no-loader]');

      if (anchor && !selfManaged && anchor.href && anchor.getAttribute('href')?.startsWith('/') && anchor.getAttribute('target') !== '_blank') {
        // Check for modifier keys to allow opening in new tab
        if (!e.metaKey && !e.ctrlKey && !e.shiftKey && e.button === 0) {
           // Only set loading if the path is different
           if (window.location.origin + anchor.getAttribute('href') !== window.location.href) {
             setLoading(true);
           }
        }
      }
    };
    
    document.addEventListener('click', handleLinkClick);
    
    return () => {
      document.removeEventListener('click', handleLinkClick);
    };
  }, []); // Run only once

  // Handle hiding the loader when the route changes
  useEffect(() => {
    // Don't hide on initial load, let the first effect handle it
    if (!isInitialLoad) {
        setLoading(false);
    }
  }, [pathname, searchParams, isInitialLoad]);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="loader"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
          className="pointer-events-none fixed inset-0 z-[9999] flex items-center justify-center bg-background/80 backdrop-blur-sm"
        >
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="flex items-center gap-3"
            >
                <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.1 }}
                    className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center shadow-lg"
                >
                    <span className="text-3xl font-headline font-bold">O</span>
                </motion.div>
                <motion.div
                    className="flex overflow-hidden"
                    variants={containerVariants}
                >
                    {'Olivare'.split('').map((char, index) => (
                        <motion.span
                            key={index}
                            variants={letterVariants}
                            className="text-3xl font-headline font-bold text-primary"
                            style={{ transitionDelay: `${index * 0.1}s` }}
                        >
                            {char}
                        </motion.span>
                    ))}
                </motion.div>
            </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
