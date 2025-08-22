'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { NextSeo } from 'next-seo';
import ProductCarousel from "@/components/ProductCarousel";
import GlobalFooter from "@/components/GlobalFooter";

interface Product {
  id: string;
  title: string;
  handle: string;
  featuredImage?: {
    url: string;
    altText?: string;
  };
  priceRange: {
    minVariantPrice: {
      amount: string;
      currencyCode: string;
    };
  };
}

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch products for the carousel
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products');
        if (response.ok) {
          const data = await response.json();
          setProducts(data.products || []);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut" as const
      }
    }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut" as const
      }
    }
  };

  // Animation for "where soft shadows bloom" text
  const softShadowsAnimation = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 2, delay: 0.6 }
  };

  return (
    <>
      <NextSeo
        title="Ghostlight Garden - Where Soft Shadows Bloom"
        description="Discover curated artwork from talented artists. Unique pieces that transform spaces and inspire creativity. Where spooky meets cute and soft shadows bloom."
        openGraph={{
          title: "Ghostlight Garden - Where Soft Shadows Bloom",
          description: "Discover curated artwork from talented artists. Unique pieces that transform spaces and inspire creativity.",
          images: [
            {
              url: "https://ghostlightgarden.com/img/brand_logo_transparent.png",
              width: 800,
              height: 600,
              alt: "Ghostlight Garden - Curated Art Collection",
            },
          ],
        }}
        additionalMetaTags={[
          {
            name: "keywords",
            content: "curated artwork, original art, spooky cute art, ghost art, garden art, unique paintings, art collection, artist marketplace, soft shadows bloom"
          }
        ]}
      />
      <div className="sticky-footer-container">

  // Fetch products for the carousel
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products');
        if (response.ok) {
          const data = await response.json();
          setProducts(data.products || []);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut" as const
      }
    }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut" as const
      }
    }
  };

  // Animation for "where soft shadows bloom" text
  const softShadowsAnimation = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 2, delay: 0.6 }
  };

  return (
    <div className="sticky-footer-container">
      {/* PC Background */}
      <div className="hidden md:block fixed inset-0 z-0">
        <div 
          className="w-full h-full bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url(/img/pc_home_background.png)' }}
        />
      </div>

      {/* Mobile Background */}
      <div className="md:hidden fixed inset-0 z-0">
        <div 
          className="w-full h-full bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url(/img/mobile_home_background.png)' }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 sticky-footer-content">
        {/* Hero Section */}
        <motion.div 
          className="flex flex-col min-h-screen text-white px-4 relative"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Container with maxWidth constraint */}
          <div style={{ 
            maxWidth: 'clamp(60%, 70vw, 80%)',
            overflow: 'visible'
          }}>
            <motion.h1 
            className="font-alex-brush 
            text-4xl 
            md:text-6xl
            lg:text-7xl
            xl:text-8xl  
            text-left 
            absolute 
            top-1/4 
            md:top-1/5 
            lg:top-1/5
            xl:top-1/5
            left-1/9 
            md:left-1/8
            lg:left-1/7
            xl:left-1/5"
            {...softShadowsAnimation}
          >
            where soft shadows bloom
            </motion.h1>
          </div>
        </motion.div>

        {/* White Content Section with Misty Transition */}
        <div className="relative bg-white flex-1 flex flex-col">
          {/* Misty Transition Overlay */}
          <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-white pointer-events-none" />
          
          {/* Content */}
          <div className="relative pt-32 px-4 flex-1">
            {/* Featured Products Section */}
            <motion.div 
              className="max-w-6xl mx-auto"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              <motion.div 
                className="text-center mb-12"
                variants={itemVariants}
              >
                <motion.h2 
                  className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  Featured Artwork
                </motion.h2>
                <motion.p 
                  className="text-lg text-gray-600 max-w-2xl mx-auto"
                  variants={itemVariants}
                >
                  Discover our curated collection of unique pieces, each telling its own story
                </motion.p>
              </motion.div>

              {/* Product Carousel */}
              {isLoading ? (
                <motion.div 
                  className="w-full h-64 bg-gray-100 rounded-lg flex items-center justify-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  <ProductCarousel products={products} />
                </motion.div>
              )}
            </motion.div>

            {/* About Section */}
            <motion.div 
              className="max-w-4xl mx-auto mt-20 mb-16 text-center"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              <motion.h2 
                className="text-3xl md:text-4xl font-bold text-gray-900 mb-6"
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                About Ghostlight Garden
              </motion.h2>
              <motion.p 
                className="text-lg text-gray-600 leading-relaxed"
                variants={itemVariants}
              >
                We curate and showcase exceptional artwork from talented artists, bringing unique pieces 
                that transform spaces and inspire creativity. Each piece in our collection is carefully 
                selected for its quality, craftsmanship, and artistic vision.
              </motion.p>
            </motion.div>
          </div>
          
          <GlobalFooter />
        </div>
      </div>
    </div>
    </>
  );
}
  );
}
