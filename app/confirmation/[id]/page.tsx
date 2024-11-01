"use client";

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { 
  Calendar, 
  Car, 
  Clock, 
  Euro,
  CheckCircle2,
  AlertCircle,
  Loader2
} from 'lucide-react';

interface Booking {
  id: string;
  vehicleSize: string;
  service: string;
  date: string;
  time: string;
  price: number;
  status: string;
  customerName: string;
  customerEmail: string;
  specialNeeds?: string;
}

export default function ConfirmationPage() {
  const { id } = useParams();
  const [booking, setBooking] = useState<Booking | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchBooking();
  }, [id]);

  const fetchBooking = async () => {
    try {
      const response = await fetch(`/api/bookings/${id}`);
      if (!response.ok) {
        throw new Error('Réservation non trouvée');
      }
      const data = await response.json();
      setBooking(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (error || !booking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="p-6 max-w-md w-full text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h1 className="text-xl font-semibold mb-2">Erreur</h1>
          <p className="text-gray-600 mb-4">{error}</p>
          <Button asChild>
            <a href="/">Retour à l'accueil</a>
          </Button>
        </Card>
      </div>
    );
  }

  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800',
    confirmed: 'bg-green-100 text-green-800',
    completed: 'bg-blue-100 text-blue-800',
    cancelled: 'bg-red-100 text-red-800',
  };

  const statusTranslations = {
    pending: 'En attente',
    confirmed: 'Confirmé',
    completed: 'Terminé',
    cancelled: 'Annulé',
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <Card className="max-w-2xl mx-auto">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold">Confirmation de Réservation</h1>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                statusColors[booking.status as keyof typeof statusColors]
              }`}>
                {statusTranslations[booking.status as keyof typeof statusTranslations]}
              </span>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start space-x-3">
                  <Car className="w-5 h-5 text-blue-600 mt-1" />
                  <div>
                    <p className="text-sm text-gray-500">Véhicule</p>
                    <p className="font-medium">{booking.vehicleSize}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <CheckCircle2 className="w-5 h-5 text-blue-600 mt-1" />
                  <div>
                    <p className="text-sm text-gray-500">Service</p>
                    <p className="font-medium">{booking.service}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Calendar className="w-5 h-5 text-blue-600 mt-1" />
                  <div>
                    <p className="text-sm text-gray-500">Date</p>
                    <p className="font-medium">
                      {format(new Date(booking.date), 'dd MMMM yyyy', { locale: fr })}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Clock className="w-5 h-5 text-blue-600 mt-1" />
                  <div>
                    <p className="text-sm text-gray-500">Heure</p>
                    <p className="font-medium">{booking.time}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Euro className="w-5 h-5 text-blue-600 mt-1" />
                  <div>
                    <p className="text-sm text-gray-500">Prix</p>
                    <p className="font-medium">{booking.price}€</p>
                  </div>
                </div>
              </div>

              {booking.specialNeeds && (
                <div className="border-t pt-4">
                  <p className="text-sm text-gray-500 mb-1">Instructions spéciales</p>
                  <p className="text-gray-700">{booking.specialNeeds}</p>
                </div>
              )}

              <div className="border-t pt-4">
                <p className="text-sm text-gray-500 mb-1">Informations client</p>
                <p className="font-medium">{booking.customerName}</p>
                <p className="text-gray-600">{booking.customerEmail}</p>
              </div>

              <div className="border-t pt-4 flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium">Numéro de réservation:</p>
                  <p className="text-gray-600">{booking.id}</p>
                </div>
                <Button asChild>
                  <a href={`/booking/modify/${booking.id}`}>
                    Modifier la réservation
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}