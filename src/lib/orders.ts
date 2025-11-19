
import type { Product } from './products';
import { z } from 'zod';

const shippingSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  address: z.string(),
  city: z.string(),
  zip: z.string(),
  country: z.string(),
});

type ShippingAddress = z.infer<typeof shippingSchema>;

export type OrderStatus = 'Verarbeitung' | 'Versendet' | 'Geliefert' | 'Storniert';

export interface Order {
    id: string;
    date: string;
    customer: string;
    email: string;
    total: number;
    status: OrderStatus;
    items: {
        id: string;
        name: string;
        price: number;
        image: string;
        quantity: number;
    }[];
    shippingAddress: ShippingAddress;
}


export const initialOrders: Order[] = [
    {
        id: 'ORD-1721921345',
        date: '2024-07-25T15:22:25.000Z',
        customer: 'Elena Petrova',
        email: 'elena@example.com',
        total: 60.00,
        status: 'Versendet',
        items: [
            { id: '1', name: 'Olivare Signature Guts-Mischung', price: 32.00, image: 'https://picsum.photos/seed/p1a/100/100', quantity: 1 },
            { id: '4', name: 'Zitronen-Olivenöl', price: 28.00, image: 'https://picsum.photos/seed/p4a/100/100', quantity: 1 },
        ],
        shippingAddress: {
            firstName: 'Elena',
            lastName: 'Petrova',
            address: 'Eichenallee 456',
            city: 'London',
            zip: 'SW1A 0AA',
            country: 'GB'
        }
    },
    {
        id: 'ORD-1721834945',
        date: '2024-07-24T15:22:25.000Z',
        customer: 'Marcus Bennett',
        email: 'marcus@example.com',
        total: 76.00,
        status: 'Geliefert',
        items: [
            { id: '3', name: 'Koroneiki Sortenrein', price: 38.00, image: 'https://picsum.photos/seed/p3a/100/100', quantity: 2 },
        ],
        shippingAddress: {
            firstName: 'Marcus',
            lastName: 'Bennett',
            address: 'Kiefernstraße 789',
            city: 'New York',
            zip: '10001',
            country: 'US'
        }
    },
    {
        id: 'ORD-1721748545',
        date: '2024-07-23T15:22:25.000Z',
        customer: 'Sophia Lee',
        email: 'sophia@example.com',
        total: 28.00,
        status: 'Verarbeitung',
        items: [
            { id: '5', name: 'Chili-Olivenöl', price: 28.00, image: 'https://picsum.photos/seed/p5a/100/100', quantity: 1 },
        ],
        shippingAddress: {
            firstName: 'Sophia',
            lastName: 'Lee',
            address: 'Ahornweg 101',
            city: 'Toronto',
            zip: 'M5V 2T6',
            country: 'CA'
        }
    },
];
