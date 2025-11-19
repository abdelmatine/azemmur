
import { Product } from '../lib/products';

export const products: Product[] = [
  {
    id: '1',
    name: 'Olivare Signature Guts-Mischung',
    price: 32.0,
    rating: 5,
    reviews: 128,
    category: 'Mischung',
    intensity: 'Mittel',
    images: [
      { src: '/images/product1.jpg', hint: 'olivenölflasche vorne' },
      { src: '/images/product1.jpg', hint: 'olivenöl spritzer' },
      { src: '/images/product1.jpg', hint: 'olivenöl gießen' },
      { src: '/images/product1.jpg', hint: 'oliven am zweig' },
    ],
    shortDescription: 'Ein Geschmack der mediterranen Sonne',
    longDescription: "Unsere Signature Guts-Mischung ist eine harmonische Vermählung von Arbequina- und Koroneiki-Oliven, die auf dem reichen Boden unseres Familienguts angebaut werden. Dieses vielseitige, mittelkräftige Öl präsentiert ein Bouquet aus grünem Apfel, frisch geschnittenem Gras und einem Hauch von Mandel, das in einem herrlich pfeffrigen Abgang gipfelt. Perfekt zum Beträufeln von frischen Salaten, zum Dippen mit knusprigem Brot oder zum Verfeinern von gegrilltem Fisch und Gemüse. Verwandeln Sie Ihr alltägliches Kochen in ein kulinarisches Fest.",
    details: {
      origin: 'Küstengriechenland',
      acidity: '< 0.3%',
      tastingNotes: 'Grüner Apfel, Mandel, Pfeffrig'
    }
  },
  {
    id: '2',
    name: 'Arbequina Sortenrein',
    price: 36.0,
    rating: 4,
    reviews: 98,
    category: 'Sortenrein',
    intensity: 'Mild',
    images: [
      { src: '/images/product2.jpg', hint: 'helle olivenölflasche' },
      { src: '/images/product2.jpg', hint: 'oliven in schale' },
      { src: '/images/product2.jpg', hint: 'salat mit dressing' },
      { src: '/images/product2.jpg', hint: 'brot dippt öl' },
    ],
    shortDescription: 'Zart, buttrig und geschmeidig',
    longDescription: "Erleben Sie die subtile Eleganz unseres sortenreinen Arbequina. Dieses milde und buttrige Öl zeichnet sich durch seine geschmeidige Textur und Noten von reifen Früchten und Mandeln aus. Es ist das perfekte Finishing-Öl für delikate Gerichte wie weißen Fisch, gedämpftes Gemüse oder leichte Suppen. Seine geringe Bitterkeit und Schärfe machen es zu einem Publikumsliebling.",
    details: {
      origin: 'Katalonien, Spanien',
      acidity: '< 0.2%',
      tastingNotes: 'Mandel, Reife Frucht, Buttrig'
    }
  },
  {
    id: '3',
    name: 'Koroneiki Sortenrein',
    price: 38.0,
    rating: 5,
    reviews: 152,
    category: 'Sortenrein',
    intensity: 'Robust',
    images: [
      { src: '/images/product3.jpg', hint: 'dunkle olivenölflasche' },
      { src: '/images/product3.jpg', hint: 'gegrilltes steak' },
      { src: '/images/product3.jpg', hint: 'rosmarinzweig' },
      { src: '/images/product3.jpg', hint: 'handwerkerbrot' },
    ],
    shortDescription: 'Kräftig, grün und pfeffrig',
    longDescription: "Unser sortenreines Koroneiki ist ein robustes und scharfes Öl für diejenigen, die einen starken, pfeffrigen Abgang schätzen. Mit intensiven Noten von grünem Gras, Artischocke und grüner Banane ist dieses Öl ein Kraftpaket an Geschmack. Verwenden Sie es zum Grillen von rotem Fleisch, zum Würzen von herzhaften Eintöpfen oder als kräftiges Dip-Öl mit Handwerkerbrot.",
    details: {
      origin: 'Peloponnes, Griechenland',
      acidity: '< 0.35%',
      tastingNotes: 'Grünes Gras, Artischocke, Pfeffriger Abgang'
    }
  },
  {
    id: '4',
    name: 'Zitronen-Olivenöl',
    price: 28.0,
    rating: 4,
    reviews: 75,
    category: 'Aromatisiert',
    intensity: 'Mild',
    images: [
      { src: '/images/product4.jpg', hint: 'zitronen olivenöl' },
      { src: '/images/product4.jpg', hint: 'zitronen am baum' },
      { src: '/images/product4.jpg', hint: 'gegrillter fisch mit zitrone' },
      { src: '/images/product4.jpg', hint: 'sommersalat' },
    ],
    shortDescription: 'Hell, spritzig und erfrischend',
    longDescription: 'Wir pressen frische, ganze Zitronen zusammen mit unseren Späternte-Oliven, um dieses lebendige aromatisierte Öl zu kreieren. Der helle, spritzige Geschmack der Zitrone ist perfekt mit der Geschmeidigkeit des Olivenöls ausbalanciert. Eine fantastische Wahl für Meeresfrüchte, Hühnchen, Salate und zum Backen.',
    details: {
      origin: 'Amalfiküste, Italien',
      acidity: '< 0.5%',
      tastingNotes: 'Frische Zitronenschale, Zitrus, Geschmeidig'
    }
  },
  {
    id: '5',
    name: 'Chili-Olivenöl',
    price: 28.0,
    rating: 5,
    reviews: 110,
    category: 'Aromatisiert',
    intensity: 'Robust',
    images: [
      { src: '/images/product5.jpg', hint: 'chili olivenöl' },
      { src: '/images/product5.jpg', hint: 'chilischoten' },
      { src: '/images/product5.jpg', hint: 'pizza mit chiliöl' },
      { src: '/images/product5.jpg', hint: 'nudelgericht' },
    ],
    shortDescription: 'Ein warmer und würziger Kick',
    longDescription: 'Für diejenigen, die es scharf mögen, liefert unser Chili-Olivenöl eine angenehme, anhaltende Schärfe. Wir legen getrocknete Chilischoten in unsere Signature-Mischung ein und kreieren so ein Öl, das sich perfekt zum Beträufeln von Pizza, Pasta oder zum Verfeinern Ihrer Lieblingsmarinaden und -saucen eignet.',
    details: {
      origin: 'Kalabrien, Italien',
      acidity: '< 0.5%',
      tastingNotes: 'Würzig, Rauchig, Warm'
    }
  },
];
