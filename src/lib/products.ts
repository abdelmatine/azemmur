
export interface Product {
    id: string;
    name: string;
    price: number;
    rating: number;
    reviews: number;
    category: 'Mischung' | 'Sortenrein' | 'Aromatisiert';
    intensity: 'Mild' | 'Mittel' | 'Robust';
    images: { src: string; hint: string }[];
    shortDescription: string;
    longDescription: string;
    details: {
        origin: string;
        acidity: string;
        tastingNotes: string;
    };
}
