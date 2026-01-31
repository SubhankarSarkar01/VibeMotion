import { Product } from '@/data/products';
import { motion } from 'framer-motion';
import React from 'react';

interface Props {
    product: Product;
}

export default function ProductSections({ product }: Props) {
    return (
        <div className="relative bg-white z-30 -mt-10 rounded-t-[3rem] shadow-[0_-20px_40px_rgba(0,0,0,0.1)] overflow-hidden">

            {/* Details Section */}
            <section className="py-24 px-6 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="aspect-square bg-gray-100 rounded-3xl overflow-hidden relative group">
                        {product.detailsSection.image ? (
                            <img
                                src={product.detailsSection.image}
                                alt={product.detailsSection.imageAlt}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                        ) : (
                            <div className="absolute inset-0 bg-gray-200 flex items-center justify-center text-gray-400">
                                [Image: {product.detailsSection.imageAlt}]
                            </div>
                        )}
                    </div>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <span className="text-orange-500 font-bold uppercase tracking-widest text-sm">Deep Dive</span>
                    <h3 className="text-5xl font-bold mt-2 mb-6 text-gray-900">{product.detailsSection.title}</h3>
                    <p className="text-xl text-gray-600 leading-relaxed">
                        {product.detailsSection.description}
                    </p>

                    <div className="mt-8 flex gap-4">
                        {product.stats.map((stat) => (
                            <div key={stat.label} className="bg-gray-50 p-4 rounded-xl text-center min-w-[100px]">
                                <div className="text-3xl font-bold text-gray-900">{stat.val}</div>
                                <div className="text-sm text-gray-500 uppercase tracking-wider">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </section>

            {/* Freshness Section */}
            <section className="py-24 bg-gray-50">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h3 className="text-4xl font-bold mb-6">{product.freshnessSection.title}</h3>
                        <p className="text-xl text-gray-600 mb-12">{product.freshnessSection.description}</p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                        {product.buyNowSection.processingParams.map((param, i) => (
                            <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                                <div className="w-12 h-12 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto mb-4 text-xl">
                                    ✓
                                </div>
                                <h4 className="font-bold text-lg">{param}</h4>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Buy Now Section */}
            <section className="py-24 px-6 max-w-7xl mx-auto">
                <div className="bg-black text-white rounded-[3rem] p-8 md:p-16 relative overflow-hidden">
                    {/* Background Gradient Blob */}
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-orange-500 to-pink-500 rounded-full blur-[100px] opacity-30 pointer-events-none transform translate-x-1/3 -translate-y-1/3" />

                    <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-5xl md:text-7xl font-bold mb-4">Stock Up.</h2>
                            <h3 className="text-3xl text-gray-400 mb-8">{product.buyNowSection.deliveryPromise}</h3>

                            <div className="flex flex-col gap-4 text-gray-400 mb-8">
                                <p>{product.buyNowSection.returnPolicy}</p>
                            </div>
                        </div>

                        <div className="bg-white/10 backdrop-blur-lg p-8 rounded-3xl border border-white/10">
                            <div className="flex justify-between items-end mb-8">
                                <div>
                                    <p className="text-gray-400 mb-1">Price per pack</p>
                                    <div className="text-5xl font-bold">{product.buyNowSection.price}</div>
                                    <div className="text-sm text-gray-400">{product.buyNowSection.unit}</div>
                                </div>
                                <div className="text-right">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                                        <span className="text-green-400 text-sm font-medium">In Stock</span>
                                    </div>
                                </div>
                            </div>

                            <button className="w-full bg-white text-black text-xl font-bold py-4 rounded-xl hover:bg-gray-200 transition-colors flex items-center justify-center gap-2">
                                Add to Cart
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
}
