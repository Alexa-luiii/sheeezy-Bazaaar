'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProductGalleryProps {
  images: string[];
}

export default function ProductGallery({ images }: ProductGalleryProps) {
  const [activeImage, setActiveImage] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.pageX - left) / width) * 100;
    const y = ((e.pageY - top) / height) * 100;
    setMousePos({ x, y });
  };

  return (
    <div className="flex flex-col-reverse lg:flex-row gap-4">
      {/* Thumbnails */}
      <div className="flex lg:flex-col gap-4 overflow-x-auto lg:overflow-y-auto no-scrollbar">
        {images.map((img, idx) => (
          <button
            key={idx}
            onClick={() => setActiveImage(idx)}
            className={cn(
              "relative min-w-[80px] w-20 lg:w-24 aspect-[3/4] border-2 transition-all duration-300 overflow-hidden group",
              activeImage === idx ? "border-accent" : "border-transparent hover:border-accent/50"
            )}
          >
            <Image
              src={img}
              alt={`Product thumbnail ${idx + 1}`}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500"
            />
          </button>
        ))}
      </div>

      {/* Main Image */}
      <div className="relative flex-1 aspect-[3/4] bg-primary overflow-hidden group cursor-zoom-in">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeImage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="relative w-full h-full"
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsZoomed(true)}
            onMouseLeave={() => setIsZoomed(false)}
          >
            <Image
              src={images[activeImage]}
              alt="Product image"
              fill
              priority
              className={cn(
                "object-cover transition-transform duration-200 ease-out",
                isZoomed ? "scale-[2.5]" : "scale-100"
              )}
              style={
                isZoomed
                  ? {
                      transformOrigin: `${mousePos.x}% ${mousePos.y}%`,
                    }
                  : undefined
              }
            />
          </motion.div>
        </AnimatePresence>

        {/* Overlay Controls */}
        <div className="absolute inset-0 flex items-center justify-between p-4 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setActiveImage((prev) => (prev > 0 ? prev - 1 : images.length - 1));
            }}
            className="p-2 rounded-full bg-surface/50 text-text backdrop-blur-md pointer-events-auto hover:bg-accent hover:text-text transition-colors"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setActiveImage((prev) => (prev < images.length - 1 ? prev + 1 : 0));
            }}
            className="p-2 rounded-full bg-surface/50 text-text backdrop-blur-md pointer-events-auto hover:bg-accent hover:text-text transition-colors"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        <div className="absolute top-4 right-4 p-2 rounded-full bg-surface/50 text-text backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity">
          <Maximize2 size={20} />
        </div>
      </div>
    </div>
  );
}
