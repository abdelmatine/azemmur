
'use client'

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../../components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../components/ui/table";
import { Badge } from "../../../components/ui/badge";
import { useOrderStore } from '../../../store/order-slice';
import type { Order, OrderStatus } from '../../../lib/orders';
import { format } from 'date-fns';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem
} from '../../../components/ui/dropdown-menu';
import { MoreHorizontal, PackageCheck, PackageSearch, Rocket, Ban } from 'lucide-react';
import { Button } from '../../../components/ui/button';

const statusStyles: { [key in OrderStatus]: string } = {
  Verarbeitung: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300',
  Versendet: 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300',
  Geliefert: 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300',
  Storniert: 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300',
};

const statusIcons: { [key in OrderStatus]: React.ElementType } = {
    Verarbeitung: PackageSearch,
    Versendet: Rocket,
    Geliefert: PackageCheck,
    Storniert: Ban,
};

export default function OrdersPage() {
    const { orders, updateOrderStatus } = useOrderStore();
    const [currentStatus, setCurrentStatus] = useState<OrderStatus>('Verarbeitung');

    return (
        <Card>
            <CardHeader>
                <CardTitle>Bestellungen</CardTitle>
                <CardDescription>Kundenbestellungen einsehen und verwalten.</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Bestell-ID</TableHead>
                            <TableHead>Datum</TableHead>
                            <TableHead>Kunde</TableHead>
                            <TableHead className="text-right">Gesamt</TableHead>
                            <TableHead className="text-center">Status</TableHead>
                            <TableHead>
                                <span className="sr-only">Aktionen</span>
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {orders.map((order) => (
                            <TableRow key={order.id}>
                                <TableCell className="font-medium">{order.id}</TableCell>
                                <TableCell>{format(new Date(order.date), 'PP')}</TableCell>
                                <TableCell>
                                    <div className="font-medium">{order.customer}</div>
                                    <div className="text-sm text-muted-foreground">{order.email}</div>
                                </TableCell>
                                <TableCell className="text-right">${order.total.toFixed(2)}</TableCell>
                                <TableCell className="text-center">
                                    <Badge className={`${statusStyles[order.status]} whitespace-nowrap`}>
                                         {React.createElement(statusIcons[order.status], { className: 'w-3 h-3 mr-1.5' })}
                                        {order.status}
                                    </Badge>
                                </TableCell>
                                <TableCell>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button aria-haspopup="true" size="icon" variant="ghost">
                                                <MoreHorizontal className="h-4 w-4" />
                                                <span className="sr-only">Menü umschalten</span>
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuLabel>Status ändern</DropdownMenuLabel>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuRadioGroup value={order.status} onValueChange={(value) => updateOrderStatus(order.id, value as OrderStatus)}>
                                                <DropdownMenuRadioItem value="Verarbeitung">Verarbeitung</DropdownMenuRadioItem>
                                                <DropdownMenuRadioItem value="Versendet">Versendet</DropdownMenuRadioItem>
                                                <DropdownMenuRadioItem value="Geliefert">Geliefert</DropdownMenuRadioItem>
                                                <DropdownMenuRadioItem value="Storniert">Storniert</DropdownMenuRadioItem>
                                            </DropdownMenuRadioGroup>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}
