"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";

const testimonials = [
  {
    name: "Sarah Martin",
    role: "Cliente Régulière",
    content: "Le meilleur service de nettoyage de voiture que j'ai jamais utilisé. Ma voiture est comme neuve à chaque fois !",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400",
  },
  {
    name: "Michel Chen",
    role: "Chef d'Entreprise",
    content: "Ils s'occupent de toute notre flotte d'entreprise. Service professionnel et fiable.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          Ce Que Disent Nos Clients
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="p-6">
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <h3 className="font-semibold">{testimonial.name}</h3>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-600">{testimonial.content}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}