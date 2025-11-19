
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../../components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../components/ui/table";
import { Badge } from "../../../components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../../../components/ui/avatar";
import { useEffect, useState } from "react";
import { customers as initialCustomers, Customer } from "../../../data/customers";
import { Skeleton } from "../../../components/ui/skeleton";

const CustomerRowSkeleton = () => (
    <TableRow>
        <TableCell>
            <div className="flex items-center gap-4">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="space-y-2">
                    <Skeleton className="h-4 w-[150px]" />
                    <Skeleton className="h-4 w-[200px]" />
                </div>
            </div>
        </TableCell>
        <TableCell><Skeleton className="h-6 w-[70px] rounded-full" /></TableCell>
        <TableCell><Skeleton className="h-4 w-[20px]" /></TableCell>
        <TableCell className="text-right"><Skeleton className="h-4 w-[80px] ml-auto" /></TableCell>
    </TableRow>
);


export default function CustomersPage() {
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [loading, setLoading] = useState(true);

     useEffect(() => {
        // Simulate API fetch
        setLoading(true);
        setTimeout(() => {
            setCustomers(initialCustomers);
            setLoading(false);
        }, 1000);
    }, []);


    return (
        <Card>
            <CardHeader>
                <CardTitle>Kunden</CardTitle>
                <CardDescription>Sehen und verwalten Sie Ihre Kunden.</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Kunde</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Bestellungen</TableHead>
                            <TableHead className="text-right">Gesamtausgaben</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {loading ? (
                             Array.from({length: 5}).map((_, i) => <CustomerRowSkeleton key={i} />)
                        ) : (
                            customers.map((customer) => (
                                <TableRow key={customer.id}>
                                    <TableCell>
                                        <div className="flex items-center gap-4">
                                            <Avatar>
                                                <AvatarImage src={customer.avatar} data-ai-hint={customer.hint} />
                                                <AvatarFallback>{customer.name.charAt(0)}</AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <p className="font-medium">{customer.name}</p>
                                                <p className="text-sm text-muted-foreground">{customer.email}</p>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant={customer.status === 'Aktiv' ? 'default' : customer.status === 'Neu' ? 'secondary' : 'outline'}>
                                            {customer.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>{customer.orders}</TableCell>
                                    <TableCell className="text-right">${customer.totalSpent.toFixed(2)}</TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}
