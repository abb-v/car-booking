"use client";

import { useState } from 'react';
import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const imagePairs = [
  {
    id: 1,
    label: "Extérieur",
    before: "https://images.unsplash.com/photo-1600045972600-5c0a4e24b01c?auto=format&fit=crop&w=1950&q=80",
    after: "https://images.unsplash.com/photo-1605515298946-d2338bd7838b?auto=format&fit=crop&w=1950&q=80",
  },
  {
    id: 2,
    label: "Intérieur",
    before: "https://images.unsplash.com/photo-1591293835940-934a7c4f2d9b?auto=format&fit=crop&w=1950&q=80",
    after: "https://images.unsplash.com/photo-1601362840469-51e4d8d58785?auto=format&fit=crop&w=1950&q=80",
  },
  {
    id: 3,
    label: "Détails",
    before: "https://images.unsplash.com/photo-1594051673969-172a6f721d3c?auto=format&fit=crop&w=1950&q=80",
    after: "https://images.unsplash.com/photo-1603386329225-868f9b1ee6c9?auto=format&fit=crop&w=1950&q=80",
  }
];

export default function BeforeAfterSection() {
  const [currentPair, setCurrentPair] = useState(0);

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">
            Voyez la Différence
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Découvrez la transformation spectaculaire de nos services de nettoyage professionnel
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <BeforeAfterSlider 
            beforeImage={imagePairs[currentPair].before}
            afterImage={imagePairs[currentPair].after}
          />
          
          <div className="mt-6 flex justify-center gap-2">
            {imagePairs.map((pair, index) => (
              <Button
                key={pair.id}
                variant={currentPair === index ? "default" : "outline"}
                onClick={() => setCurrentPair(index)}
                className="min-w-[120px]"
              >
                {pair.label}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}