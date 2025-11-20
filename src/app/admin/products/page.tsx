"use client";

export const dynamic = "force-dynamic";

import React, { useState, useEffect } from "react";
import { Button } from "../../../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../../../components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";
import { Product } from "../../../lib/products";
import { products as initialProducts } from "../../../data/products";
import { Badge } from "../../../components/ui/badge";
import Image from "next/image";
import { MoreHorizontal, PlusCircle } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../../../components/ui/dropdown-menu";
import { ProductDialog } from "../../../components/admin/product-dialog";
import { Skeleton } from "../../../components/ui/skeleton";

const ProductRowSkeleton = () => (
  <TableRow>
    <TableCell className="hidden sm:table-cell">
      <Skeleton className="w-16 h-16 rounded-md" />
    </TableCell>
    <TableCell>
      <Skeleton className="h-5 w-3/4" />
    </TableCell>
    <TableCell>
      <Skeleton className="h-6 w-20 rounded-full" />
    </TableCell>
    <TableCell>
      <Skeleton className="h-5 w-16" />
    </TableCell>
    <TableCell className="hidden md:table-cell">
      <Skeleton className="h-5 w-24" />
    </TableCell>
    <TableCell className="hidden md:table-cell">
      <Skeleton className="h-5 w-20" />
    </TableCell>
    <TableCell>
      <Skeleton className="h-8 w-8 rounded-full" />
    </TableCell>
  </TableRow>
);

export default function ProductsAdminPage() {
  const [productList, setProductList] = useState<Product[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | undefined>(
    undefined
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API fetch
    setLoading(true);
    setTimeout(() => {
      setProductList(initialProducts);
      setLoading(false);
    }, 500);
  }, []);

  const handleSave = (product: Product) => {
    if (selectedProduct) {
      setProductList((prev) =>
        prev.map((p) => (p.id === product.id ? product : p))
      );
    } else {
      setProductList((prev) => [
        ...prev,
        { ...product, id: (prev.length + 2).toString() },
      ]);
    }
    setIsDialogOpen(false);
  };

  const handleDelete = (id: string) => {
    setProductList((prev) => prev.filter((p) => p.id !== id));
  };

  const handleAdd = () => {
    setSelectedProduct(undefined);
    setIsDialogOpen(true);
  };

  const handleEdit = (product: Product) => {
    setSelectedProduct(product);
    setIsDialogOpen(true);
  };

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <div>
              <CardTitle>Produkte</CardTitle>
              <CardDescription>
                Verwalten Sie Ihre Produkte und sehen Sie deren
                Verkaufsleistung.
              </CardDescription>
            </div>
            <Button size="sm" onClick={handleAdd} className="w-full sm:w-auto">
              <PlusCircle className="mr-2 h-4 w-4" />
              Produkt hinzufügen
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="hidden w-[100px] sm:table-cell">
                  Bild
                </TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Preis</TableHead>
                <TableHead className="hidden md:table-cell">
                  Kategorie
                </TableHead>
                <TableHead className="hidden md:table-cell">
                  Intensität
                </TableHead>
                <TableHead>
                  <span className="sr-only">Aktionen</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading
                ? Array.from({ length: 5 }).map((_, i) => (
                    <ProductRowSkeleton key={i} />
                  ))
                : productList.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell className="hidden sm:table-cell">
                        {product.images && product.images[0] && (
                          <div className="relative group">
                            <Image
                              alt={product.name}
                              className="aspect-square rounded-md object-cover"
                              height="64"
                              src={product.images[0].src}
                              width="64"
                            />
                          </div>
                        )}
                      </TableCell>
                      <TableCell className="font-medium">
                        {product.name}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">Auf Lager</Badge>
                      </TableCell>
                      <TableCell>${product.price.toFixed(2)}</TableCell>
                      <TableCell className="hidden md:table-cell">
                        {product.category}
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {product.intensity}
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              aria-haspopup="true"
                              size="icon"
                              variant="ghost"
                            >
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Menü umschalten</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Aktionen</DropdownMenuLabel>
                            <DropdownMenuItem
                              onSelect={() => handleEdit(product)}
                            >
                              Bearbeiten
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onSelect={() => handleDelete(product.id)}
                            >
                              Löschen
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <ProductDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSave={handleSave}
        product={selectedProduct}
      />
    </>
  );
}
