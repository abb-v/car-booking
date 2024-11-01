"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Phone, Mail, MessageCircle, X } from "lucide-react";

export default function Footer() {
  const [showCookieConsent, setShowCookieConsent] = useState(true);

  const acceptCookies = () => {
    setShowCookieConsent(false);
    localStorage.setItem('cookieConsent', 'accepted');
  };

  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Contact Section */}
          <div>
            <h3 className="font-semibold mb-4">Nous Contacter</h3>
            <div className="space-y-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start">
                    <Phone className="w-4 h-4 mr-2" />
                    Appelez-nous
                  </Button>
                </PopoverTrigger>
                <PopoverContent>
                  <a href="tel:+1234567890" className="block p-2 hover:bg-gray-100 rounded">
                    +1 (234) 567-890
                  </a>
                </PopoverContent>
              </Popover>

              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start">
                    <Mail className="w-4 h-4 mr-2" />
                    Envoyez-nous un email
                  </Button>
                </PopoverTrigger>
                <PopoverContent>
                  <a href="mailto:contact@carclean.com" className="block p-2 hover:bg-gray-100 rounded">
                    contact@carclean.com
                  </a>
                </PopoverContent>
              </Popover>

              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    WhatsApp
                  </Button>
                </PopoverTrigger>
                <PopoverContent>
                  <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer" 
                     className="block p-2 hover:bg-gray-100 rounded">
                    Discuter sur WhatsApp
                  </a>
                </PopoverContent>
              </Popover>
            </div>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="font-semibold mb-4">Mentions Légales</h3>
            <ul className="space-y-2">
              <li>
                <a href="/terms" className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                  Conditions d'utilisation
                </a>
              </li>
              <li>
                <a href="/privacy" className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                  Politique de confidentialité
                </a>
              </li>
              <li>
                <a href="/refund" className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                  Politique de remboursement
                </a>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h3 className="font-semibold mb-4">Horaires d'ouverture</h3>
            <ul className="space-y-2 text-gray-600 dark:text-gray-400">
              <li>Lundi - Vendredi: 9h00 - 18h00</li>
              <li>Samedi: 9h00 - 16h00</li>
              <li>Dimanche: Fermé</li>
            </ul>
          </div>

          {/* Company Info */}
          <div>
            <h3 className="font-semibold mb-4">L'entreprise</h3>
            <address className="text-gray-600 dark:text-gray-400 not-italic">
              Car Clean Pro<br />
              123 Rue du Nettoyage<br />
              75000 Paris<br />
              N° d'enregistrement: 123456789
            </address>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t text-center text-gray-600 dark:text-gray-400">
          <p>© {new Date().getFullYear()} Car Clean Pro. Tous droits réservés.</p>
        </div>
      </div>

      {/* Cookie Consent Banner */}
      {showCookieConsent && (
        <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t p-4 shadow-lg">
          <div className="container mx-auto flex items-center justify-between">
            <p className="text-sm text-gray-600 dark:text-gray-300 mr-4">
              Nous utilisons des cookies pour améliorer votre expérience.
              <a href="/privacy" className="underline ml-1">
                En savoir plus
              </a>
            </p>
            <div className="flex gap-2">
              <Button onClick={acceptCookies} size="sm">
                Accepter
              </Button>
              <Button variant="outline" size="sm" onClick={() => setShowCookieConsent(false)}>
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
}