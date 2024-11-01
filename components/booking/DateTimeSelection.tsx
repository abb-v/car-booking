"use client";

import { useState } from "react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const timeSlots = [
  "09:00", "10:00", "11:00", "12:00",
  "13:00", "14:00", "15:00", "16:00", "17:00"
];

export default function DateTimeSelection({
  onBack,
  onNext,
  selectedDate,
  selectedTime,
}: {
  onBack: () => void;
  onNext: (date: string, time: string) => void;
  selectedDate: string;
  selectedTime: string;
}) {
  const [date, setDate] = useState<Date | undefined>(
    selectedDate ? new Date(selectedDate) : undefined
  );
  const [time, setTime] = useState<string>(selectedTime);

  const handleNext = () => {
    if (date && time) {
      onNext(format(date, "yyyy-MM-dd"), time);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6">Select Date & Time</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-medium mb-4">Choose a Date</h3>
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border"
            disabled={(date) => {
              const today = new Date();
              today.setHours(0, 0, 0, 0);
              return date < today || date.getDay() === 0; // Disable past dates and Sundays
            }}
          />
        </div>

        <div>
          <h3 className="text-lg font-medium mb-4">Choose a Time</h3>
          <div className="grid grid-cols-3 gap-2">
            {timeSlots.map((slot) => (
              <Button
                key={slot}
                variant={time === slot ? "default" : "outline"}
                className="w-full"
                onClick={() => setTime(slot)}
              >
                {slot}
              </Button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-between mt-6">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button
          onClick={handleNext}
          disabled={!date || !time}
        >
          Next
        </Button>
      </div>
    </div>
  );
}