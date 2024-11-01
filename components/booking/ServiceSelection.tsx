"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Droplet, Sparkles, Shield } from "lucide-react";

const getServicePrice = (vehicleSize: string, serviceType: string) => {
  const basePrices = {
    Basic: { Compact: 30, Medium: 40, Large: 50 },
    Premium: { Compact: 50, Medium: 65, Large: 80 },
    Ultimate: { Compact: 80, Medium: 100, Large: 120 },
  };
  return basePrices[serviceType as keyof typeof basePrices][vehicleSize as keyof typeof basePrices["Basic"]];
};

const services = [
  {
    type: "Basic",
    description: "Lavage extérieur, aspirateur, vitres",
    Icon: Droplet,
    features: ["Lavage Extérieur Manuel", "Aspirateur Intérieur", "Nettoyage des Vitres"],
  },
  {
    type: "Premium",
    description: "Basic + nettoyage intérieur profond",
    Icon: Sparkles,
    features: [
      "Tous les Services Basic",
      "Nettoyage Intérieur Profond",
      "Soin Tableau de Bord",
      "Traitement des Pneus",
    ],
  },
  {
    type: "Ultimate",
    description: "Premium + cire & protection",
    Icon: Shield,
    features: [
      "Tous les Services Premium",
      "Protection par Cire",
      "Traitement Cuir",
      "Nettoyage Compartiment Moteur",
      "Protection Peinture",
    ],
  },
];

export default function ServiceSelection({
  vehicleSize,
  onBack,
  onNext,
  selectedService,
}: {
  vehicleSize: string;
  onBack: () => void;
  onNext: (service: string, price: number) => void;
  selectedService: string;
}) {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6">Choisissez Votre Forfait</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {services.map((service) => {
          const price = getServicePrice(vehicleSize, service.type);
          const { Icon } = service;
          return (
            <Card
              key={service.type}
              className={`p-6 cursor-pointer transition-all hover:shadow-lg ${
                selectedService === service.type
                  ? "border-2 border-blue-500"
                  : "border border-gray-200"
              }`}
              onClick={() => onNext(service.type, price)}
            >
              <div className="flex flex-col h-full">
                <div className="flex items-center mb-4">
                  <Icon className="w-8 h-8 text-blue-600 mr-3" />
                  <h3 className="text-lg font-semibold">{service.type}</h3>
                </div>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <div className="flex-grow">
                  <ul className="space-y-2">
                    {service.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-sm">
                        <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-4 pt-4 border-t">
                  <p className="text-2xl font-bold text-blue-600">{price}€</p>
                </div>
              </div>
            </Card>
          )}
        )}
      </div>
      <div className="flex justify-between mt-6">
        <Button variant="outline" onClick={onBack}>
          Retour
        </Button>
      </div>
    </div>
  );
}