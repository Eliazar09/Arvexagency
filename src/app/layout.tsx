import type { Metadata } from 'next';
import { Fraunces, Manrope, JetBrains_Mono } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import { SITE } from '@/config/site';
import '@/styles/globals.css';

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-display',
  axes: ['opsz', 'SOFT', 'WONK'],
  display: 'swap',
  preload: true,
});

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['200', '300', '400', '500', '600', '700', '800'],
  display: 'swap',
});

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.arvexagency.online"),
  title: {
    default: "Criação de Sites e Automação em Boa Vista RR | Arvex Agency",
    template: "%s | Arvex Agency",
  },
  description:
    "Criação de sites profissionais, automação WhatsApp e sistemas web em Boa Vista, Roraima (RR). Projetos modernos entregues em poucos dias.",
  keywords: [
    "criação de sites",
    "automação WhatsApp",
    "sistemas web",
    "Boa Vista RR",
    "Roraima",
    "agência de tecnologia",
    "sites profissionais",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Arvex Agency — Sites, Sistemas e Automação",
    description:
      "Sites profissionais, automação WhatsApp e sistemas web em Boa Vista RR.",
    url: "https://www.arvexagency.online",
    siteName: "Arvex Agency",
    locale: "pt_BR",
    type: "website",
    images: [
      {
        url: "https://www.arvexagency.online/og",
        width: 1200,
        height: 630,
        alt: "Arvex Agency",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Arvex Agency — Sites e Automação",
    description:
      "Sites profissionais, automação WhatsApp e sistemas web em Boa Vista RR.",
    images: ["https://www.arvexagency.online/og"],
  },
};

const schemaOrg = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: SITE.name,
  description: 'Studio de tecnologia em Boa Vista, Roraima. Sites profissionais, automação de WhatsApp e sistemas web.',
  url: SITE.url,
  telephone: SITE.contact.phone,
  email: SITE.contact.email,
  address: {
    '@type': 'PostalAddress',
    addressLocality: SITE.location.city,
    addressRegion: SITE.location.region,
    addressCountry: SITE.location.country,
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: SITE.location.lat,
    longitude: SITE.location.lng,
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '18:00',
    },
  ],
  priceRange: 'R$250–R$699/mês',
  currenciesAccepted: 'BRL',
  paymentAccepted: 'Pix, Cartão, Transferência',
  areaServed: {
    '@type': 'Country',
    name: 'Brasil',
  },
  sameAs: [
    'https://instagram.com/arvexbr',
    'https://linkedin.com/company/arvexbr',
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="pt-BR"
      className={`dark ${fraunces.variable} ${manrope.variable} ${jetbrains.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }}
        />
      </head>
      <body>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-red focus:text-paper focus:text-sm"
        >
          Pular para conteúdo
        </a>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
