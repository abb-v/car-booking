export default function PrivacyPolicy() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Politique de Confidentialité</h1>
      
      <div className="prose max-w-none">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">1. Collecte des Informations</h2>
          <p className="mb-4">
            Nous collectons les informations que vous nous fournissez directement lorsque vous :
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Créez un compte</li>
            <li>Effectuez une réservation</li>
            <li>Contactez notre service client</li>
            <li>Vous inscrivez à notre newsletter</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">2. Utilisation des Données</h2>
          <p className="mb-4">
            Nous utilisons vos informations personnelles pour :
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Gérer votre compte</li>
            <li>Traiter vos réservations</li>
            <li>Vous envoyer des confirmations</li>
            <li>Améliorer nos services</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">3. Protection des Données</h2>
          <p className="mb-4">
            Nous mettons en œuvre des mesures de sécurité appropriées pour protéger vos informations personnelles contre tout accès, modification, divulgation ou destruction non autorisé.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">4. Cookies</h2>
          <p className="mb-4">
            Nous utilisons des cookies pour améliorer votre expérience sur notre site. Vous pouvez contrôler les cookies via les paramètres de votre navigateur.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">5. Vos Droits</h2>
          <p className="mb-4">
            Vous avez le droit de :
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Accéder à vos données personnelles</li>
            <li>Rectifier vos données</li>
            <li>Supprimer vos données</li>
            <li>Vous opposer au traitement</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">6. Contact</h2>
          <p className="mb-4">
            Pour toute question concernant notre politique de confidentialité, contactez-nous à :
            <br />
            <a href="mailto:privacy@carcleanpro.com" className="text-blue-600 hover:underline">
              privacy@carcleanpro.com
            </a>
          </p>
        </section>
      </div>
    </div>
  );
}