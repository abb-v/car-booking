"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, AlertCircle, Tag, Megaphone } from 'lucide-react';

const promos = [
  {
    id: 1,
    message: "🌟 -20% sur tous les services Premium ce mois-ci !",
    type: "promo",
    icon: Tag
  },
  {
    id: 2,
    message: "🚗 Nouveau : Protection céramique disponible !",
    type: "info",
    icon: Megaphone
  },
  {
    id: 3,
    message: "✨ Satisfait ou refait gratuitement",
    type: "guarantee",
    icon: AlertCircle
  }
];

export default function PromoBanner() {
  const [currentPromo, setCurrentPromo] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  const promo = promos[currentPromo];
  const Icon = promo.icon;

  return (
    <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 text-white">
      <div className="container mx-auto px-4">
        <div className="py-2 flex items-center justify-between">
          <AnimatePresence mode="wait">
            <motion.div
              key={promo.id}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="flex items-center space-x-2"
            >
              <Icon className="w-4 h-4" />
              <span className="text-sm font-medium">{promo.message}</span>
            </motion.div>
          </AnimatePresence>
          
          <div className="flex items-center space-x-2">
            <div className="flex space-x-1">
              {promos.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPromo(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    currentPromo === index ? 'bg-white' : 'bg-white/30'
                  }`}
                />
              ))}
            </div>
            <button
              onClick={() => setIsVisible(false)}
              className="p-1 hover:bg-white/10 rounded-full transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}