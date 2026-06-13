export const SITE = {
  name: 'Arvex Agency',
  url: 'https://www.arvexagency.online',
  location: {
    city: 'Boa Vista',
    region: 'RR',
    country: 'BR',
    lat: 2.8235,
    lng: -60.6758,
  },
  contact: {
    email: 'arvexagency@outlook.com',
    phone: '+55-95-9-8107-5842',
    whatsapp: '5595981075842',
    waBase: 'https://wa.me/5595981075842',
  },
  socials: {
    instagram: 'https://www.instagram.com/arvexagency/',
    facebook: 'https://www.facebook.com/profile.php?id=61577662511296',
  },
} as const;

export function waLink(text?: string): string {
  if (!text) return SITE.contact.waBase;
  return `${SITE.contact.waBase}?text=${encodeURIComponent(text)}`;
}
