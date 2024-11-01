"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Car, Truck, ChevronsUpDown } from "lucide-react";

const vehicles = [
  {
    size: "Compact",
    description: "Berline, Citadine",
    Icon: Car,
  },
  {
    size: "Moyen",
    description: "SUV, Crossover",
    Icon: ChevronsUpDown, // Using a more suitable icon for SUV
  },
  {
    size: "Grand",
    description: "Van, Camion",
    Icon: Truck,
  },
];

interface VehicleSelectionProps {
  onNext: (size: string) => void;
  selectedSize: string;
}

export default function VehicleSelection({ 
  onNext, 
  selectedSize 
}: VehicleSelectionProps) {
  const handleSelection = (size: string) => {
    if (size !== selectedSize) {
      onNext(size);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6">Sélectionnez la Taille de Votre Véhicule</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {vehicles.map((vehicle) => {
          const { Icon } = vehicle;
          return (
            <Card
              key={vehicle.size}
              className={`p-6 cursor-pointer transition-all hover:shadow-lg ${
                selectedSize === vehicle.size
                  ? "border-2 border-blue-500"
                  : "border border-gray-200"
              }`}
              onClick={() => handleSelection(vehicle.size)}
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-24 h-24 mb-4 rounded-full bg-blue-50 flex items-center justify-center">
                  <Icon className="w-12 h-12 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{vehicle.size}</h3>
                <p className="text-gray-600 text-sm">{vehicle.description}</p>
              </div>
            </Card>
          );
        })}
      </div>
      <p className="text-sm text-gray-500 text-center">
        Sélectionnez la taille qui correspond le mieux à votre véhicule
      </p>
    </div>
  );
}