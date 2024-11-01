"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import BubbleBackground from "@/components/BubbleBackground";

interface HeroSectionProps {
  onBookingClick: () => void;
}

export default function HeroSection({ onBookingClick }: HeroSectionProps) {
  return (
    <section className="relative h-[80vh] bg-gradient-to-r from-blue-600 to-indigo-600 text-white overflow-hidden">
      {/* Bubble Background */}
      <BubbleBackground />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/70" />
      
      {/* Content */}
      <div className="relative container mx-auto px-4 h-full flex items-center">
        <div className="max-w-2xl">
          <motion.h1 
            className="text-5xl md:text-6xl font-bold mb-6 drop-shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Services de Nettoyage Professionnel de Voitures
          </motion.h1>
          <motion.p 
            className="text-xl mb-8 drop-shadow-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Transformez votre véhicule avec nos services de nettoyage premium. 
            Un soin professionnel pour chaque voiture, à chaque fois.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Button 
              size="lg"
              onClick={onBookingClick}
              className="bg-white text-blue-600 hover:bg-blue-50 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Réserver Maintenant <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}