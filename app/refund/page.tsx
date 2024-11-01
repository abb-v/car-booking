export default function RefundPolicy() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Politique de Remboursement</h1>
      
      <div className="prose max-w-none">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">1. Satisfaction Client</h2>
          <p className="mb-4">
            Votre satisfaction est notre priorité. Si vous n'êtes pas satisfait de nos services, nous nous engageons à :
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Reprendre le travail gratuitement</li>
            <li>Offrir un remboursement partiel ou total selon la situation</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">2. Conditions de Remboursement</h2>
          <p className="mb-4">
            Les remboursements sont évalués au cas par cas et peuvent être accordés dans les situations suivantes :
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Service non conforme à la description</li>
            <li>Problèmes techniques majeurs</li>
            <li>Retard significatif non justifié</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">3. Procédure de Remboursement</h2>
          <p className="mb-4">
            Pour demander un remboursement :
          </p>
          <ol className="list-decimal pl-6 mb-4">
            <li>Contactez notre service client dans les 24h suivant le service</li>
            <li>Expliquez clairement le problème rencontré</li>
            <li>Fournissez des photos si nécessaire</li>
            <li>Notre équipe évaluera votre demande sous 48h</li>
          </ol>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">4. Délais de Remboursement</h2>
          <p className="mb-4">
            Une fois le remboursement approuvé, le traitement sera effectué sous 5-10 jours ouvrés, selon votre mode de paiement initial.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">5. Contact</h2>
          <p className="mb-4">
            Pour toute question concernant notre politique de remboursement, contactez-nous à :
            <br />
            <a href="mailto:support@carcleanpro.com" className="text-blue-600 hover:underline">
              support@carcleanpro.com
            </a>
          </p>
        </section>
      </div>
    </div>
  );
}