import React from 'react';
import { Helmet } from 'react-helmet-async';

function StructuredData() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "AutomotiveBusiness",
    "name": "ARZ Delivery & Automobile",
    "alternateName": "ARZ Automobile",
    "description": "Seriöser Autoankauf mit kostenloser Abholung - Wir kommen zu Ihnen und kaufen Ihr Auto zum fairen Preis",
    "url": "https://arz-automobile.de",
    "telephone": "+49-176-30339020",
    "email": "Arzautomobileservice@gmail.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Sauerfeldstraße 4",
      "addressLocality": "Rheinberg",
      "postalCode": "47495",
      "addressCountry": "DE"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "51.5483",
      "longitude": "6.5983"
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "08:00",
        "closes": "18:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": "Saturday",
        "opens": "09:00",
        "closes": "14:00"
      }
    ],
    "priceRange": "€€",
    "areaServed": {
      "@type": "Country",
      "name": "Deutschland"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "5000",
      "bestRating": "5"
    },
    "paymentAccepted": "Cash, Transfer",
    "currenciesAccepted": "EUR",
    "slogan": "Wir kommen zu Ihnen - deutschlandweit!",
    "foundingDate": "2009",
    "founder": {
      "@type": "Person",
      "name": "Hussein Hajj Sleiman"
    }
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Autoankauf mit Abholservice",
    "provider": {
      "@type": "AutomotiveBusiness",
      "name": "ARZ Delivery & Automobile"
    },
    "areaServed": {
      "@type": "Country",
      "name": "Deutschland"
    },
    "offers": {
      "@type": "Offer",
      "priceCurrency": "EUR",
      "availability": "https://schema.org/InStock"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Autoankauf Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Kostenlose Fahrzeugbewertung",
            "description": "Ermitteln Sie online kostenlos den Wert Ihres Gebrauchtwagens - unverbindlich und ohne Registrierung"
          },
          "price": "0",
          "priceCurrency": "EUR"
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Gebrauchtwagen Ankauf mit Abholservice",
            "description": "Wir kaufen Ihr Auto zu fairen Preisen und holen es kostenlos bei Ihnen ab - deutschlandweit"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Kostenlose Fahrzeugabholung",
            "description": "Bundesweite kostenlose Abholung direkt bei Ihnen zu Hause"
          },
          "price": "0",
          "priceCurrency": "EUR"
        }
      ]
    }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Wie funktioniert der Autoverkauf?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Der Verkaufsprozess ist einfach: 1) Füllen Sie unser Online-Formular mit den Fahrzeugdaten aus. 2) Wir melden uns innerhalb von 24 Stunden mit einem Angebot. 3) Bei Annahme vereinbaren wir einen Termin zur kostenlosen Abholung. 4) Bei Übergabe erhalten Sie sofort den Kaufpreis."
        }
      },
      {
        "@type": "Question",
        "name": "Ist die Fahrzeugbewertung kostenlos?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Ja, unsere Fahrzeugbewertung ist 100% kostenlos und unverbindlich. Es entstehen keinerlei Kosten für Sie."
        }
      },
      {
        "@type": "Question",
        "name": "Muss ich zu einer Filiale fahren?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Nein! Das ist unser Service: Sie müssen nirgendwo hinfahren. Wir kommen deutschlandweit kostenlos zu Ihnen nach Hause und holen Ihr Fahrzeug vor Ihrer Haustür ab."
        }
      },
      {
        "@type": "Question",
        "name": "Welche Marken kaufen Sie an?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Wir kaufen alle Automarken: BMW, Mercedes, VW, Audi, Opel, Ford, Toyota und viele mehr. Alle Modelle und Baujahre sind willkommen."
        }
      }
    ]
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(organizationSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(serviceSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(faqSchema)}
      </script>
    </Helmet>
  );
}

export default StructuredData;

