"use client";

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
}

export default function BeforeAfterSlider({ beforeImage, afterImage }: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (event: MouseEvent | TouchEvent) => {
    if (!isDragging || !containerRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const x = 'touches' in event ? event.touches[0].clientX : event.clientX;
    const position = ((x - containerRect.left) / containerRect.width) * 100;
    
    setSliderPosition(Math.min(Math.max(position, 0), 100));
  };

  useEffect(() => {
    const handleMouseUp = () => setIsDragging(false);
    const handleMouseMove = (e: MouseEvent) => handleMove(e);
    const handleTouchMove = (e: TouchEvent) => handleMove(e);

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchend', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, [isDragging]);

  return (
    <motion.div 
      ref={containerRef}
      className="relative w-full h-[400px] overflow-hidden rounded-lg cursor-ew-resize shadow-xl"
      onMouseDown={() => setIsDragging(true)}
      onTouchStart={() => setIsDragging(true)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* After Image (Background) */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-200"
        style={{ backgroundImage: `url(${afterImage})` }}
      />

      {/* Before Image (Clipped) */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-200"
        style={{ 
          backgroundImage: `url(${beforeImage})`,
          clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)`
        }}
      />
      
      {/* Slider Handle */}
      <div 
        className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize transition-transform duration-200"
        style={{ left: `${sliderPosition}%` }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center">
          <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center">
            <svg 
              className="w-4 h-4 text-white"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M13 17l5-5-5-5M6 17l5-5-5-5" />
            </svg>
          </div>
        </div>
      </div>

      {/* Labels */}
      <div className="absolute bottom-4 left-4 bg-black/50 text-white px-3 py-1 rounded text-sm font-medium">
        Avant
      </div>
      <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded text-sm font-medium">
        Après
      </div>

      {/* Touch Instructions */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded text-sm font-medium opacity-50">
        Glissez pour comparer
      </div>
    </motion.div>
  );
}