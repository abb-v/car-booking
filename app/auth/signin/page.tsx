"use client";

import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Github, Mail } from "lucide-react";

export default function SignIn() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md p-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold">Bienvenue</h1>
          <p className="text-gray-600 mt-2">Connectez-vous à votre compte</p>
        </div>

        <div className="space-y-4">
          <Button
            variant="outline"
            className="w-full"
            onClick={() => signIn("google", { callbackUrl: "/" })}
          >
            <Mail className="mr-2 h-4 w-4" />
            Continuer avec Google
          </Button>

          <Button
            variant="outline"
            className="w-full"
            onClick={() => signIn("github", { callbackUrl: "/" })}
          >
            <Github className="mr-2 h-4 w-4" />
            Continuer avec GitHub
          </Button>
        </div>

        <p className="text-center text-sm text-gray-600 mt-8">
          En vous connectant, vous acceptez nos{" "}
          <a href="/terms" className="text-blue-600 hover:underline">
            Conditions d'utilisation
          </a>{" "}
          et notre{" "}
          <a href="/privacy" className="text-blue-600 hover:underline">
            Politique de confidentialité
          </a>
        </p>
      </Card>
    </div>
  );
}