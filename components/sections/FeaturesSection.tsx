"use client";

import { motion } from "framer-motion";
import { Sparkles, Star, Shield } from "lucide-react";
import { Card } from "@/components/ui/card";

const features = [
  {
    title: "Équipement Professionnel",
    description: "Utilisation des dernières technologies de nettoyage et produits écologiques",
    Icon: Sparkles,
    color: "bg-blue-500",
  },
  {
    title: "Équipe Expérimentée",
    description: "Nos nettoyeurs certifiés ont des années d'expérience",
    Icon: Star,
    color: "bg-green-500",
  },
  {
    title: "Satisfaction Garantie",
    description: "100% satisfaction ou nous re-nettoyons gratuitement",
    Icon: Shield,
    color: "bg-purple-500",
  },
];

export default function FeaturesSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Pourquoi Nous Choisir ?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const { Icon } = feature;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="p-6 h-full">
                  <div className={`w-12 h-12 ${feature.color} rounded-lg flex items-center justify-center mb-4`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}