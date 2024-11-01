"use client";

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AlertCircle, Loader2 } from 'lucide-react';
import BookingForm from '@/components/booking/BookingForm';
import { toast } from 'react-toastify';

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

export default function ModifyBookingPage() {
  const { id } = useParams();
  const router = useRouter();
  const [booking, setBooking] = useState<Booking | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    if (verified) {
      fetchBooking();
    }
  }, [id, verified]);

  const fetchBooking = async () => {
    try {
      const response = await fetch(`/api/bookings/${id}`);
      if (!response.ok) {
        throw new Error('Réservation non trouvée');
      }
      const data = await response.json();
      setBooking(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Une erreur est survenue';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const verifyEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`/api/bookings/${id}/verify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      
      if (!response.ok) {
        throw new Error('Email non valide pour cette réservation');
      }
      
      setVerified(true);
      setError(null);
      toast.success('Email vérifié avec succès');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Une erreur est survenue';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (updatedBooking: Partial<Booking>) => {
    try {
      const response = await fetch(`/api/bookings/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedBooking),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la mise à jour');
      }

      toast.success('Réservation mise à jour avec succès');
      router.push(`/confirmation/${id}`);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Une erreur est survenue';
      setError(errorMessage);
      toast.error(errorMessage);
    }
  };

  // Rest of the component remains the same...
}