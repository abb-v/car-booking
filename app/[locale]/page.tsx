"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Car, Calendar, Clock, CheckCircle, ArrowRight, Star, Shield, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import VehicleSelection from "@/components/booking/VehicleSelection";
import ServiceSelection from "@/components/booking/ServiceSelection";
import DateTimeSelection from "@/components/booking/DateTimeSelection";
import BookingSummary from "@/components/booking/BookingSummary";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import { useTranslations } from 'next-intl';

export default function LocalePage() {
  const t = useTranslations();
  const [showBooking, setShowBooking] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [bookingData, setBookingData] = useState({
    vehicleSize: "",
    service: "",
    date: "",
    time: "",
    price: 0,
  });

  const features = [
    {
      title: "Professional Equipment",
      description: "Using the latest cleaning technology and eco-friendly products",
      icon: Sparkles,
      color: "bg-blue-500",
    },
    {
      title: "Experienced Team",
      description: "Our certified cleaners have years of experience",
      icon: Star,
      color: "bg-green-500",
    },
    {
      title: "Satisfaction Guaranteed",
      description: "100% satisfaction or we'll re-clean for free",
      icon: Shield,
      color: "bg-purple-500",
    },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Regular Customer",
      content: "The best car cleaning service I've ever used. My car looks brand new every time!",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400",
    },
    {
      name: "Michael Chen",
      role: "Business Owner",
      content: "They take care of our entire company fleet. Professional and reliable service.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
    },
  ];

  if (showBooking) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4 py-8">
          <Button 
            variant="ghost" 
            onClick={() => setShowBooking(false)}
            className="mb-8"
          >
            ← Back to Home
          </Button>
          
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
              {t('home.title')}
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              {t('home.subtitle')}
            </p>
          </div>

          <Card className="max-w-3xl mx-auto">
            <Tabs value={String(currentStep)} className="w-full">
              <TabsContent value="1">
                <VehicleSelection
                  onNext={(vehicleSize) => {
                    setBookingData(prev => ({ ...prev, vehicleSize }));
                    setCurrentStep(2);
                  }}
                  selectedSize={bookingData.vehicleSize}
                />
              </TabsContent>
              <TabsContent value="2">
                <ServiceSelection
                  vehicleSize={bookingData.vehicleSize}
                  onBack={() => setCurrentStep(1)}
                  onNext={(service, price) => {
                    setBookingData(prev => ({ ...prev, service, price }));
                    setCurrentStep(3);
                  }}
                  selectedService={bookingData.service}
                />
              </TabsContent>
              <TabsContent value="3">
                <DateTimeSelection
                  onBack={() => setCurrentStep(2)}
                  onNext={(date, time) => {
                    setBookingData(prev => ({ ...prev, date, time }));
                    setCurrentStep(4);
                  }}
                  selectedDate={bookingData.date}
                  selectedTime={bookingData.time}
                />
              </TabsContent>
              <TabsContent value="4">
                <BookingSummary
                  bookingData={bookingData}
                  onBack={() => setCurrentStep(3)}
                  onConfirm={() => {
                    // Handle booking confirmation
                    alert("Booking confirmed!");
                  }}
                />
              </TabsContent>
            </Tabs>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[80vh] bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="absolute inset-0 bg-black/40" />
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1601362840469-51e4d8d58785?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')"
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70" />
        
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="max-w-2xl">
            <motion.h1 
              className="text-5xl md:text-6xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Professional Car Cleaning Services
            </motion.h1>
            <motion.p 
              className="text-xl mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Transform your vehicle with our premium cleaning services. 
              Professional care for every car, every time.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Button 
                size="lg"
                onClick={() => setShowBooking(true)}
                className="bg-white text-blue-600 hover:bg-blue-50"
              >
                Book Now <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="p-6 h-full">
                  <div className={`w-12 h-12 ${feature.color} rounded-lg flex items-center justify-center mb-4`}>
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Before/After Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            See the Difference
          </h2>
          <div className="max-w-4xl mx-auto">
            <BeforeAfterSlider 
              beforeImage="https://images.unsplash.com/photo-1600045972600-5c0a4e24b01c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
              afterImage="https://images.unsplash.com/photo-1605515298946-d2338bd7838b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
            />
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            What Our Customers Say
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
    </div>
  );
}