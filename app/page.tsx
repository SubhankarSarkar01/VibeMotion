'use client';

import React, { useState, useEffect } from 'react';
import { products } from '@/data/products';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductBottleScroll from '@/components/ProductBottleScroll';
import ProductTextOverlays from '@/components/ProductTextOverlays';
import ProductSections from '@/components/ProductSections';

export default function Home() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const product = products[currentIndex];

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [currentIndex]);

    const nextProduct = () => {
        setCurrentIndex((prev) => (prev + 1) % products.length);
    };

    const prevProduct = () => {
        setCurrentIndex((prev) => (prev - 1 + products.length) % products.length);
    };

    return (
        <main className="min-h-screen font-sans selection:bg-orange-500 selection:text-white">
            <Navbar />

            <AnimatePresence mode="wait">
                <motion.div
                    key={product.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="relative"
                >
                    {/* Dynamic Background */}
                    <div
                        className="fixed inset-0 z-0 transition-colors duration-1000"
                        style={{ background: product.gradient }} // Fallback or simpler bg
                    >
                        <div className="absolute inset-0 bg-white/80" /> {/* Lighten it up */}
                    </div>

                    {/* Scroll Interaction Zone */}
                    <div className="relative z-10">
                        <ProductBottleScroll product={product} />
                        <ProductTextOverlays product={product} />
                    </div>

                    {/* Content Sections */}
                    <ProductSections product={product} />

                    {/* Next Flavor CTA */}
                    <div className="relative z-30 bg-white pb-24 px-6 text-center">
                        <button
                            onClick={nextProduct}
                            className="group relative inline-flex items-center gap-4 text-3xl md:text-5xl font-bold hover:text-orange-600 transition-colors"
                        >
                            <span>Next Flavor</span>
                            <span className="group-hover:translate-x-4 transition-transform">→</span>
                        </button>
                    </div>

                </motion.div>
            </AnimatePresence>

            {/* Floating Navigation Controls */}
            <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex items-center gap-4 bg-white/80 backdrop-blur-md px-6 py-3 rounded-full shadow-2xl border border-white/20">
                <button onClick={prevProduct} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                    ←
                </button>
                <div className="flex gap-2">
                    {products.map((p, idx) => (
                        <button
                            key={p.id}
                            onClick={() => setCurrentIndex(idx)}
                            className={`w-3 h-3 rounded-full transition-all ${idx === currentIndex ? 'bg-black w-8' : 'bg-gray-300 hover:bg-gray-400'}`}
                        />
                    ))}
                </div>
                <button onClick={nextProduct} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                    →
                </button>
            </div>

            <Footer />
        </main>
    );
}
