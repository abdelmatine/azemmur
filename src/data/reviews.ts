
export interface Review {
    id: string;
    productId: string;
    author: string;
    avatar: string;
    rating: number;
    comment: string;
    date: string;
}

export const initialReviews: Review[] = [
    {
        id: 'rev-1-1',
        productId: '1',
        author: 'Elena S.',
        avatar: 'https://picsum.photos/seed/r1/100/100',
        rating: 5,
        comment: "Absolut göttlich! Diese Mischung ist perfekt ausbalanciert, mit einer fruchtigen Note und einem angenehm pfeffrigen Abgang. Es ist zu einem festen Bestandteil in meiner Küche für alles geworden, von Salaten bis zum Verfeinern von geröstetem Gemüse.",
        date: '2024-07-15T10:00:00Z',
    },
    {
        id: 'rev-1-2',
        productId: '1',
        author: 'John D.',
        avatar: 'https://picsum.photos/seed/r2/100/100',
        rating: 5,
        comment: "Man schmeckt die Qualität. Das ist nicht nur Olivenöl; es ist ein Erlebnis. Ich liebe es zum Dippen mit frischem Sauerteigbrot. Einfach, aber so geschmackvoll.",
        date: '2024-07-12T14:30:00Z',
    },
    {
        id: 'rev-2-1',
        productId: '2',
        author: 'Isabella R.',
        avatar: 'https://picsum.photos/seed/r3/100/100',
        rating: 4,
        comment: "Sehr geschmeidig und buttrig, genau wie beschrieben. Es ist fantastisch zu Fisch und Huhn. Nicht so kräftig wie andere Öle, was es sehr vielseitig für feinere Gerichte macht. Einen Stern Abzug, weil ich mir eine größere Flasche wünsche!",
        date: '2024-06-28T09:00:00Z',
    },
    {
        id: 'rev-3-1',
        productId: '3',
        author: 'Marcus Bennett',
        avatar: 'https://picsum.photos/seed/r4/100/100',
        rating: 5,
        comment: "DAS ist ein robustes Olivenöl! Der pfeffrige Kick am Ende ist genau das, was ich bei einem Koroneiki suche. Es passt wunderbar zu gegrilltem Steak und kräftigeren Aromen. Sehr zu empfehlen für wahre Olivenöl-Liebhaber.",
        date: '2024-07-20T18:00:00Z',
    },
     {
        id: 'rev-5-1',
        productId: '5',
        author: 'James Carter',
        avatar: 'https://picsum.photos/seed/r5/100/100',
        rating: 5,
        comment: "Die perfekte Schärfe! Es ist nicht überwältigend scharf, hat aber eine wunderbare, warme Schärfe, die nachklingt. Ich gebe es auf alles - Pizza, Eier, geröstetes Gemüse. Es macht süchtig.",
        date: '2024-07-18T11:45:00Z',
    },
];
