"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useTranslations } from 'next-intl';

interface SpecialNeedsProps {
  onBack: () => void;
  onNext: (specialNeeds: string, customerName: string, customerEmail: string) => void;
  specialNeeds?: string;
  customerName?: string;
  customerEmail?: string;
}

export default function SpecialNeeds({
  onBack,
  onNext,
  specialNeeds = "",
  customerName = "",
  customerEmail = "",
}: SpecialNeedsProps) {
  const t = useTranslations();
  const [needs, setNeeds] = useState(specialNeeds);
  const [name, setName] = useState(customerName);
  const [email, setEmail] = useState(customerEmail);

  const handleNext = () => {
    if (name && email) {
      onNext(needs, name, email);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-semibold">{t('special.title')}</h2>
      
      <div className="space-y-4">
        <Textarea
          placeholder={t('special.placeholder')}
          value={needs}
          onChange={(e) => setNeeds(e.target.value)}
          className="h-32"
        />
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">{t('special.customerInfo')}</h3>
        
        <div className="space-y-4">
          <div>
            <Input
              placeholder={t('special.name')}
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          
          <div>
            <Input
              type="email"
              placeholder={t('special.email')}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
        </div>
      </div>

      <div className="flex justify-between pt-4">
        <Button variant="outline" onClick={onBack}>
          {t('common.back')}
        </Button>
        <Button
          onClick={handleNext}
          disabled={!name || !email}
          className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
        >
          {t('common.next')}
        </Button>
      </div>
    </div>
  );
}