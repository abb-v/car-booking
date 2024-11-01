"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { format } from "date-fns";
import { Car, Calendar, Clock, DollarSign, Phone, Mail, User } from "lucide-react";
import { toast } from 'react-toastify';
import { z } from 'zod';

interface BookingData {
  vehicleSize: string;
  service: string;
  date: string;
  time: string;
  price: number;
  specialNeeds?: string;
}

const contactSchema = z.object({
  customerName: z.string().min(2, "Le nom est requis"),
  customerEmail: z.string().email("Email invalide"),
  customerPhone: z.string().min(10, "Numéro de téléphone invalide"),
});

export default function BookingSummary({
  bookingData,
  onBack,
  onConfirm,
}: {
  bookingData: BookingData;
  onBack: () => void;
  onConfirm: () => void;
}) {
  const [contactData, setContactData] = useState({
    customerName: "",
    customerEmail: "",
    customerPhone: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formattedDate = bookingData.date 
    ? format(new Date(bookingData.date), "d MMMM yyyy")
    : "";

  const handleSubmit = async () => {
    try {
      const validatedData = contactSchema.parse(contactData);
      setIsSubmitting(true);

      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...bookingData,
          ...validatedData,
        }),
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || 'Erreur lors de la réservation');
      }

      toast.success('Réservation confirmée avec succès !');
      onConfirm();
    } catch (error) {
      if (error instanceof z.ZodError) {
        error.errors.forEach(err => {
          toast.error(err.message);
        });
      } else {
        toast.error(error instanceof Error ? error.message : 'Une erreur est survenue');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6">Résumé de la Réservation</h2>
      
      <Card className="p-6 mb-6">
        <div className="space-y-4">
          <div className="flex items-center">
            <Car className="w-5 h-5 text-blue-600 mr-3" />
            <div>
              <p className="text-sm text-gray-500">Taille du Véhicule</p>
              <p className="font-medium">{bookingData.vehicleSize}</p>
            </div>
          </div>
          
          <div className="flex items-center">
            <Clock className="w-5 h-5 text-blue-600 mr-3" />
            <div>
              <p className="text-sm text-gray-500">Service</p>
              <p className="font-medium">{bookingData.service}</p>
            </div>
          </div>
          
          <div className="flex items-center">
            <Calendar className="w-5 h-5 text-blue-600 mr-3" />
            <div>
              <p className="text-sm text-gray-500">Date et Heure</p>
              <p className="font-medium">
                {formattedDate} à {bookingData.time}
              </p>
            </div>
          </div>
          
          <div className="flex items-center">
            <DollarSign className="w-5 h-5 text-blue-600 mr-3" />
            <div>
              <p className="text-sm text-gray-500">Prix Total</p>
              <p className="font-medium">{bookingData.price}€</p>
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-6 mb-6">
        <h3 className="font-medium mb-4">Vos Coordonnées</h3>
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <User className="w-5 h-5 text-gray-400" />
            <Input
              placeholder="Votre nom"
              value={contactData.customerName}
              onChange={(e) => setContactData(prev => ({ ...prev, customerName: e.target.value }))}
            />
          </div>
          <div className="flex items-center space-x-3">
            <Mail className="w-5 h-5 text-gray-400" />
            <Input
              type="email"
              placeholder="Votre email"
              value={contactData.customerEmail}
              onChange={(e) => setContactData(prev => ({ ...prev, customerEmail: e.target.value }))}
            />
          </div>
          <div className="flex items-center space-x-3">
            <Phone className="w-5 h-5 text-gray-400" />
            <Input
              type="tel"
              placeholder="Votre téléphone"
              value={contactData.customerPhone}
              onChange={(e) => setContactData(prev => ({ ...prev, customerPhone: e.target.value }))}
            />
          </div>
        </div>
      </Card>

      <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg mb-6">
        <h3 className="font-medium mb-2">Prochaines Étapes</h3>
        <ul className="text-sm space-y-2">
          <li>• Vous recevrez un email de confirmation avec les détails</li>
          <li>• Notre équipe arrivera à l'heure prévue</li>
          <li>• Paiement à effectuer après le service</li>
          <li>• Satisfaction 100% garantie</li>
        </ul>
      </div>

      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack}>
          Retour
        </Button>
        <Button 
          onClick={handleSubmit} 
          disabled={isSubmitting}
          className="px-8"
        >
          {isSubmitting ? 'Confirmation...' : 'Confirmer la Réservation'}
        </Button>
      </div>
    </div>
  );
}