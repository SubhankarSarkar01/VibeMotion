'use client';

import React from 'react';
import Link from 'next/link';
import { motion, useScroll, useMotionValueEvent, useTransform } from 'framer-motion';
import { useState } from 'react';

export default function Navbar() {
    const { scrollY } = useScroll();
    const [scrolled, setScrolled] = useState(false);

    useMotionValueEvent(scrollY, "change", (latest) => {
        setScrolled(latest > 50);
    });

    return (
        <motion.nav
            className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b ${scrolled ? 'bg-white/70 backdrop-blur-xl border-gray-200 py-3' : 'bg-transparent border-transparent py-6'}`}
        >
            <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
                {/* Branding */}
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-pink-500 rounded-lg flex items-center justify-center transform group-hover:rotate-12 transition-transform">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" fill="white" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                    <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-pink-600">
                        Nano Banana
                    </span>
                </Link>

                {/* Actions */}
                <div className="flex items-center gap-6">
                    <Link href="#" className="hidden md:block text-gray-600 hover:text-black font-medium transition-colors">Our Story</Link>
                    <Link href="#" className="hidden md:block text-gray-600 hover:text-black font-medium transition-colors">Flavors</Link>
                    <button className="bg-black text-white px-6 py-2.5 rounded-full font-medium hover:bg-gray-800 transition-all shadow-lg hover:shadow-orange-500/20">
                        Order Now
                    </button>
                </div>
            </div>
        </motion.nav>
    );
}
