import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AuthError() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md p-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Erreur d'Authentification</h1>
        <p className="text-gray-600 mb-6">
          Un problème est survenu lors de la connexion. Veuillez réessayer.
        </p>
        <Button asChild>
          <Link href="/auth/signin">Retour à la Connexion</Link>
        </Button>
      </Card>
    </div>
  );
}