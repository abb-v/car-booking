"use client";

import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { format } from 'date-fns';
import { toast } from 'react-toastify';

interface Booking {
  id: string;
  vehicleSize: string;
  service: string;
  date: string;
  time: string;
  price: number;
  specialNeeds?: string;
  customerName: string;
  customerEmail: string;
  status: string;
}

export default function AdminPanel() {
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await fetch('/api/bookings');
      const data = await response.json();
      setBookings(data);
    } catch (error) {
      toast.error('Erreur lors de la récupération des réservations');
    }
  };

  const updateStatus = async (id: string, status: string) => {
    try {
      const response = await fetch(`/api/bookings/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      
      if (!response.ok) {
        throw new Error('Erreur lors de la mise à jour du statut');
      }
      
      toast.success('Statut mis à jour avec succès');
      fetchBookings();
    } catch (error) {
      toast.error('Erreur lors de la mise à jour du statut');
    }
  };

  const deleteBooking = async (id: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette réservation ?')) {
      try {
        const response = await fetch(`/api/bookings/${id}`, { method: 'DELETE' });
        
        if (!response.ok) {
          throw new Error('Erreur lors de la suppression');
        }
        
        toast.success('Réservation supprimée avec succès');
        fetchBookings();
      } catch (error) {
        toast.error('Erreur lors de la suppression de la réservation');
      }
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Gestion des Réservations</h1>
      
      <Card className="p-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Client</TableHead>
              <TableHead>Service</TableHead>
              <TableHead>Véhicule</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bookings.map((booking) => (
              <TableRow key={booking.id}>
                <TableCell>
                  {format(new Date(booking.date), 'dd/MM/yyyy')}
                  <br />
                  <span className="text-sm text-gray-500">{booking.time}</span>
                </TableCell>
                <TableCell>
                  {booking.customerName}
                  <br />
                  <span className="text-sm text-gray-500">{booking.customerEmail}</span>
                </TableCell>
                <TableCell>{booking.service}</TableCell>
                <TableCell>{booking.vehicleSize}</TableCell>
                <TableCell>
                  <select
                    value={booking.status}
                    onChange={(e) => updateStatus(booking.id, e.target.value)}
                    className="p-1 rounded border"
                  >
                    <option value="pending">En attente</option>
                    <option value="confirmed">Confirmé</option>
                    <option value="completed">Terminé</option>
                    <option value="cancelled">Annulé</option>
                  </select>
                </TableCell>
                <TableCell>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => deleteBooking(booking.id)}
                  >
                    Supprimer
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}