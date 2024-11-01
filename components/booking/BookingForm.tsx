"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { CalendarIcon } from 'lucide-react';

interface BookingFormProps {
  initialData?: {
    vehicleSize: string;
    service: string;
    date: string;
    time: string;
    specialNeeds?: string;
    customerName: string;
    customerEmail: string;
  };
  onSubmit: (data: any) => void;
  submitLabel: string;
}

const timeSlots = [
  "09:00", "10:00", "11:00", "12:00",
  "13:00", "14:00", "15:00", "16:00", "17:00"
];

const vehicleSizes = ["Compact", "Medium", "Large"];
const services = ["Basic", "Premium", "Ultimate"];

export default function BookingForm({ initialData, onSubmit, submitLabel }: BookingFormProps) {
  const [formData, setFormData] = useState({
    vehicleSize: initialData?.vehicleSize || '',
    service: initialData?.service || '',
    date: initialData?.date ? new Date(initialData.date) : undefined,
    time: initialData?.time || '',
    specialNeeds: initialData?.specialNeeds || '',
    customerName: initialData?.customerName || '',
    customerEmail: initialData?.customerEmail || '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label>Type de véhicule</Label>
          <div className="grid grid-cols-3 gap-2">
            {vehicleSizes.map((size) => (
              <Button
                key={size}
                type="button"
                variant={formData.vehicleSize === size ? 'default' : 'outline'}
                onClick={() => setFormData({ ...formData, vehicleSize: size })}
              >
                {size}
              </Button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Label>Service</Label>
          <div className="grid grid-cols-3 gap-2">
            {services.map((service) => (
              <Button
                key={service}
                type="button"
                variant={formData.service === service ? 'default' : 'outline'}
                onClick={() => setFormData({ ...formData, service })}
              >
                {service}
              </Button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Label>Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-start text-left font-normal"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {formData.date ? (
                  format(formData.date, 'PPP', { locale: fr })
                ) : (
                  <span>Choisir une date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={formData.date}
                onSelect={(date) => setFormData({ ...formData, date })}
                disabled={(date) => {
                  const today = new Date();
                  today.setHours(0, 0, 0, 0);
                  return date < today || date.getDay() === 0;
                }}
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-2">
          <Label>Heure</Label>
          <div className="grid grid-cols-3 gap-2">
            {timeSlots.map((time) => (
              <Button
                key={time}
                type="button"
                variant={formData.time === time ? 'default' : 'outline'}
                onClick={() => setFormData({ ...formData, time })}
              >
                {time}
              </Button>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="specialNeeds">Instructions spéciales</Label>
        <Textarea
          id="specialNeeds"
          value={formData.specialNeeds}
          onChange={(e) => setFormData({ ...formData, specialNeeds: e.target.value })}
          placeholder="Instructions particulières pour votre véhicule..."
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="customerName">Nom complet</Label>
          <Input
            id="customerName"
            value={formData.customerName}
            onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="customerEmail">Email</Label>
          <Input
            id="customerEmail"
            type="email"
            value={formData.customerEmail}
            onChange={(e) => setFormData({ ...formData, customerEmail: e.target.value })}
            required
          />
        </div>
      </div>

      <Button type="submit" className="w-full">
        {submitLabel}
      </Button>
    </form>
  );
}