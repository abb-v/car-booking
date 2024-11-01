"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import VehicleSelection from "@/components/booking/VehicleSelection";
import ServiceSelection from "@/components/booking/ServiceSelection";
import DateTimeSelection from "@/components/booking/DateTimeSelection";
import BookingSummary from "@/components/booking/BookingSummary";
import HeroSection from "@/components/sections/HeroSection";
import FeaturesSection from "@/components/sections/FeaturesSection";
import BeforeAfterSection from "@/components/sections/BeforeAfterSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";

export default function HomePage() {
  const [showBooking, setShowBooking] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [bookingData, setBookingData] = useState({
    vehicleSize: "",
    service: "",
    date: "",
    time: "",
    price: 0,
  });

  if (showBooking) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4 py-8">
          <Button 
            variant="ghost" 
            onClick={() => setShowBooking(false)}
            className="mb-8"
          >
            ← Retour à l'Accueil
          </Button>
          
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
              Nettoyage Professionnel de Voitures
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Réservez votre service de nettoyage en quelques étapes
            </p>
          </div>

          <Card className="max-w-3xl mx-auto">
            {currentStep === 1 && (
              <VehicleSelection
                onNext={(vehicleSize) => {
                  setBookingData(prev => ({ ...prev, vehicleSize }));
                  setCurrentStep(2);
                }}
                selectedSize={bookingData.vehicleSize}
              />
            )}
            {currentStep === 2 && (
              <ServiceSelection
                vehicleSize={bookingData.vehicleSize}
                onBack={() => setCurrentStep(1)}
                onNext={(service, price) => {
                  setBookingData(prev => ({ ...prev, service, price }));
                  setCurrentStep(3);
                }}
                selectedService={bookingData.service}
              />
            )}
            {currentStep === 3 && (
              <DateTimeSelection
                onBack={() => setCurrentStep(2)}
                onNext={(date, time) => {
                  setBookingData(prev => ({ ...prev, date, time }));
                  setCurrentStep(4);
                }}
                selectedDate={bookingData.date}
                selectedTime={bookingData.time}
              />
            )}
            {currentStep === 4 && (
              <BookingSummary
                bookingData={bookingData}
                onBack={() => setCurrentStep(3)}
                onConfirm={() => {
                  // Handle booking confirmation
                  alert("Réservation confirmée !");
                }}
              />
            )}
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <HeroSection onBookingClick={() => setShowBooking(true)} />
      <FeaturesSection />
      <BeforeAfterSection />
      <TestimonialsSection />
    </div>
  );
}