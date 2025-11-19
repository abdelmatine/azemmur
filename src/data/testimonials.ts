
export interface Testimonial {
    name: string;
    avatar: string;
    image: string;
    hint: string;
    rating: number;
    quote: string;
}

export const testimonials: Testimonial[] = [
  {
    name: 'Elena S.',
    avatar: 'ES',
    image: '/images/person1.png',
    hint: 'frauenporträt',
    rating: 5,
    quote:
      'Die Olivare Signature Mischung hat mein Kochen verändert. Der Geschmack ist so reich und rein, dass er selbst die einfachsten Gerichte aufwertet. Ich kann mir meine Küche nicht mehr ohne vorstellen!',
  },
  {
    name: 'Marcus B.',
    avatar: 'MB',
    image: '/images/person2.png',
    hint: 'mann porträt',
    rating: 5,
    quote:
      'Als Koch bin ich bei meinen Zutaten unglaublich wählerisch. Das Koroneiki-Öl von Olivare ist unübertroffen in seiner Robustheit und seinem pfeffrigen Abgang. Es ist ein wahrer Star in meinem Restaurant.',
  },
  {
    name: 'Sophia L.',
    avatar: 'SL',
    image: '/images/person3.png',
    hint: 'personenporträt',
    rating: 4.5,
    quote:
      'Ich habe das mit Zitrone aromatisierte Öl aus einer Laune heraus gekauft und bin absolut besessen davon. Es ist perfekt für Salate, Fisch und sogar zum Backen. So hell und erfrischend!',
  },
];
