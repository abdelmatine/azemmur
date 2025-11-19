
export interface Customer {
    id: string;
    name: string;
    email: string;
    orders: number;
    totalSpent: number;
    status: 'Aktiv' | 'Neu' | 'Inaktiv';
    avatar: string;
    hint: string;
}

export const customers: Customer[] = [
    { id: '1', name: 'Elena Petrova', email: 'elena@example.com', orders: 5, totalSpent: 180.50, status: 'Aktiv', avatar: 'https://picsum.photos/seed/c1/100/100', hint: 'woman portrait' },
    { id: '2', name: 'Marcus Bennett', email: 'marcus@example.com', orders: 3, totalSpent: 110.00, status: 'Aktiv', avatar: 'https://picsum.photos/seed/c2/100/100', hint: 'man portrait' },
    { id: '3', name: 'Sophia Lee', email: 'sophia@example.com', orders: 8, totalSpent: 320.75, status: 'Aktiv', avatar: 'https://picsum.photos/seed/c3/100/100', hint: 'person portrait' },
    { id: '4', name: 'James Carter', email: 'james@example.com', orders: 1, totalSpent: 32.00, status: 'Neu', avatar: 'https://picsum.photos/seed/c4/100/100', hint: 'man portrait professional' },
    { id: '5', name: 'Isabella Rossi', email: 'isabella@example.com', orders: 0, totalSpent: 0, status: 'Inaktiv', avatar: 'https://picsum.photos/seed/c5/100/100', hint: 'woman portrait content' },
];
