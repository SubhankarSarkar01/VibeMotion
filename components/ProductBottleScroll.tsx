'use client';

import { useScroll, useMotionValueEvent } from 'framer-motion';
import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Product } from '@/data/products';

interface Props {
    product: Product;
}

export default function ProductBottleScroll({ product }: Props) {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [imagesLoaded, setImagesLoaded] = useState(false);
    const [currentFrame, setCurrentFrame] = useState(0);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end end'],
    });

    // Preload Images
    useEffect(() => {
        const loadedImages: HTMLImageElement[] = [];
        let loadedCount = 0;
        const totalFrames = 120; // 1 to 120

        for (let i = 1; i <= totalFrames; i++) {
            const img = new Image();
            // Trying to match user's potential file names if needed, but keeping to spec for now.
            // Spec says: 1.webp to 120.webp.
            // If the user has other filenames, they might need to rename or we adjust here.
            img.src = `${product.folderPath}/${i}.webp`;
            img.onload = () => {
                loadedCount++;
                if (loadedCount >= totalFrames) { // Allow partial loading to show something? No, strict.
                    setImagesLoaded(true);
                }
            };
            img.onerror = (e) => {
                console.error(`Failed to load image: ${img.src}`, e);
            };
            loadedImages.push(img);
        }
        setImages(loadedImages);
    }, [product.folderPath]);

    const renderFrame = useCallback((index: number) => {
        if (!canvasRef.current || !images[index]) return;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const img = images[index];

        // Resize canvas to match window/container
        // We want "contain" fit
        const parent = canvas.parentElement;
        if (parent) {
            canvas.width = parent.clientWidth;
            canvas.height = parent.clientHeight;

            // Clear
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Calculate aspect ratio
            const hRatio = canvas.width / img.width;
            const vRatio = canvas.height / img.height;
            const ratio = Math.min(hRatio, vRatio);

            const centerShift_x = (canvas.width - img.width * ratio) / 2;
            const centerShift_y = (canvas.height - img.height * ratio) / 2;

            ctx.drawImage(img,
                0, 0, img.width, img.height,
                centerShift_x, centerShift_y, img.width * ratio, img.height * ratio
            );
        }

    }, [images]);

    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        if (!imagesLoaded) return;
        const frameIndex = Math.min(119, Math.floor(latest * 120)); // Buffer
        if (frameIndex !== currentFrame) {
            setCurrentFrame(frameIndex);
            requestAnimationFrame(() => renderFrame(frameIndex));
        }
    });

    // Initial render when loaded
    useEffect(() => {
        if (imagesLoaded && images.length > 0) {
            renderFrame(0);
        }
    }, [imagesLoaded, renderFrame, images.length]);


    return (
        <div ref={containerRef} className="relative h-[500vh] z-10">
            <div className="sticky top-0 left-0 w-full h-screen flex items-center justify-center overflow-hidden">
                <canvas ref={canvasRef} className="w-full h-full object-contain" />
                {!imagesLoaded && (
                    <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                        <p>Loading freshness...</p>
                    </div>
                )}
            </div>
        </div>
    );
}
