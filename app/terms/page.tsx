export default function TermsOfService() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Conditions d'Utilisation</h1>
      
      <div className="prose max-w-none">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">1. Acceptation des Conditions</h2>
          <p className="mb-4">
            En accédant et en utilisant ce site, vous acceptez d'être lié par ces conditions d'utilisation, toutes les lois et réglementations applicables.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">2. Services</h2>
          <p className="mb-4">
            Nous nous engageons à fournir les meilleurs services de nettoyage automobile possibles. Nos services comprennent :
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Nettoyage extérieur</li>
            <li>Nettoyage intérieur</li>
            <li>Traitement céramique</li>
            <li>Protection et finition</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">3. Réservations</h2>
          <p className="mb-4">
            Les réservations sont soumises à disponibilité. Nous nous réservons le droit de refuser le service à notre discrétion.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">4. Annulations</h2>
          <p className="mb-4">
            Les annulations doivent être effectuées au moins 24 heures avant le rendez-vous prévu. Des frais peuvent s'appliquer pour les annulations tardives.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">5. Paiements</h2>
          <p className="mb-4">
            Nous acceptons les paiements par carte bancaire, espèces et virement bancaire. Le paiement est dû au moment du service.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">6. Responsabilité</h2>
          <p className="mb-4">
            Nous nous engageons à prendre le plus grand soin de votre véhicule. Cependant, nous ne pouvons être tenus responsables des dommages préexistants.
          </p>
        </section>
      </div>
    </div>
  );
}