'use client';

import { useScroll, useTransform, motion } from 'framer-motion';
import React, { useRef } from 'react';
import { Product } from '@/data/products';

interface Props {
    product: Product;
}

export default function ProductTextOverlays({ product }: Props) {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end end'], // Matches the 500vh container
    });

    // Helper to create fade in/out transforms
    // range: [start, peak_start, peak_end, end]
    const useFade = (range: [number, number, number, number]) => {
        return useTransform(scrollYProgress, range, [0, 1, 1, 0]);
    };

    const useTranslateY = (range: [number, number, number, number]) => {
        return useTransform(scrollYProgress, range, [50, 0, 0, -50]);
    }

    // Define ranges for 4 sections spread across 500vh
    // 0-0.2: Section 1
    // 0.25-0.45: Section 2
    // 0.5-0.7: Section 3
    // 0.75-0.95: Section 4

    const opacity1 = useFade([0.05, 0.1, 0.2, 0.25]);
    const y1 = useTranslateY([0.05, 0.1, 0.2, 0.25]);

    const opacity2 = useFade([0.3, 0.35, 0.45, 0.5]);
    const y2 = useTranslateY([0.3, 0.35, 0.45, 0.5]);

    const opacity3 = useFade([0.55, 0.6, 0.7, 0.75]);
    const y3 = useTranslateY([0.55, 0.6, 0.7, 0.75]);

    const opacity4 = useFade([0.8, 0.85, 0.9, 0.95]);
    const y4 = useTranslateY([0.8, 0.85, 0.9, 0.95]);

    return (
        <div ref={containerRef} className="absolute top-0 left-0 w-full h-[500vh] pointer-events-none z-20">

            {/* Section 1 */}
            <div className="sticky top-0 h-screen flex items-center justify-start px-8 md:px-24">
                <motion.div style={{ opacity: opacity1, y: y1 }} className="max-w-xl">
                    <h2 className="text-6xl md:text-8xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-pink-500">
                        {product.section1.title}
                    </h2>
                    <p className="text-3xl md:text-5xl font-light text-gray-800 mt-4">{product.section1.subtitle}</p>
                </motion.div>
            </div>

            {/* Section 2 */}
            <div className="sticky top-0 h-screen flex items-center justify-end px-8 md:px-24">
                <motion.div style={{ opacity: opacity2, y: y2 }} className="max-w-xl text-right">
                    <h2 className="text-5xl md:text-7xl font-bold text-gray-900">
                        {product.section2.title}
                    </h2>
                    <p className="text-2xl md:text-4xl text-gray-600 mt-4">{product.section2.subtitle}</p>
                </motion.div>
            </div>

            {/* Section 3 */}
            <div className="sticky top-0 h-screen flex items-center justify-start px-8 md:px-24">
                <motion.div style={{ opacity: opacity3, y: y3 }} className="max-w-xl">
                    <h2 className="text-5xl md:text-7xl font-bold text-gray-900">
                        {product.section3.title}
                    </h2>
                    <p className="text-2xl md:text-4xl text-gray-600 mt-4">{product.section3.subtitle}</p>
                </motion.div>
            </div>

            {/* Section 4 */}
            <div className="sticky top-0 h-screen flex items-center justify-center text-center px-8">
                <motion.div style={{ opacity: opacity4, y: y4 }} className="max-w-4xl">
                    <h2 className="text-6xl md:text-9xl font-black text-gray-900 leading-tight">
                        {product.section4.title}
                    </h2>
                </motion.div>
            </div>

        </div>
    );
}
