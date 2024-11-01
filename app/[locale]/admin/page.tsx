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
    const response = await fetch('/api/bookings');
    const data = await response.json();
    setBookings(data);
  };

  const updateStatus = async (id: string, status: string) => {
    await fetch(`/api/bookings/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    fetchBookings();
  };

  const deleteBooking = async (id: string) => {
    if (confirm('Are you sure you want to delete this booking?')) {
      await fetch(`/api/bookings/${id}`, { method: 'DELETE' });
      fetchBookings();
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Booking Management</h1>
      
      <Card className="p-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Service</TableHead>
              <TableHead>Vehicle</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bookings.map((booking) => (
              <TableRow key={booking.id}>
                <TableCell>
                  {format(new Date(booking.date), 'MMM d, yyyy')}
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
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </TableCell>
                <TableCell>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => deleteBooking(booking.id)}
                  >
                    Delete
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