
'use client'

import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose, DialogDescription } from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Product } from '../../lib/products';
import { uploadImage } from '../../lib/firebase';
import { Progress } from '../ui/progress';

const productSchema = z.object({
  name: z.string().min(1, 'Produktname ist erforderlich'),
  price: z.coerce.number().min(0.01, 'Preis muss größer als 0 sein'),
  category: z.enum(['Mischung', 'Sortenrein', 'Aromatisiert']),
  intensity: z.enum(['Mild', 'Mittel', 'Robust']),
});

type ProductFormValues = z.infer<typeof productSchema>;

interface ProductDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (product: Product) => void;
  product?: Product;
}

export function ProductDialog({ isOpen, onClose, onSave, product }: ProductDialogProps) {
  const { register, handleSubmit, reset, control, formState: { errors } } = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);


  useEffect(() => {
    if (isOpen && product) {
      reset(product);
    } else if (isOpen && !product) {
      reset({
        name: '',
        price: 0,
        category: 'Mischung',
        intensity: 'Mittel',
      });
    }
    setImageFile(null);
    setIsUploading(false);
    setUploadProgress(0);
  }, [isOpen, product, reset]);

  const onSubmit = async (data: ProductFormValues) => {
    setIsUploading(true);
    let imageUrl = product?.images[0]?.src || 'https://placehold.co/600x800.png';

    if (imageFile) {
        try {
            imageUrl = await uploadImage(
                imageFile,
                (progress) => setUploadProgress(progress)
            );
        } catch (error) {
            console.error("Bild-Upload fehlgeschlagen", error);
            // Optionally, show an error toast to the user
            setIsUploading(false);
            return;
        }
    }
    
    onSave({
      ...product,
      id: product?.id || Date.now().toString(),
      ...data,
      rating: product?.rating || 0,
      reviews: product?.reviews || 0,
      images: [{ src: imageUrl, hint: data.name }],
      shortDescription: product?.shortDescription || '',
      longDescription: product?.longDescription || '',
      details: product?.details || { origin: '', acidity: '', tastingNotes: '' },
    });
    
    setIsUploading(false);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{product ? 'Produkt bearbeiten' : 'Neues Produkt hinzufügen'}</DialogTitle>
          <DialogDescription>
            Füllen Sie die folgenden Details aus, um {product ? 'das' : 'ein neues'} Produkt {product ? 'zu aktualisieren' : 'hinzuzufügen'}.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 pt-4">
            <div>
                <Label htmlFor="image">Produktbild</Label>
                <Input
                id="image"
                type="file"
                accept="image/*"
                onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                disabled={isUploading}
                />
                {isUploading && <Progress value={uploadProgress} className="mt-2" />}
            </div>

          <div>
            <Label htmlFor="name">Produktname</Label>
            <Input id="name" {...register('name')} placeholder="z.B. Olivare Signature Blend" disabled={isUploading}/>
            {errors.name && <p className="text-sm text-destructive mt-1">{errors.name.message}</p>}
          </div>
          <div>
            <Label htmlFor="price">Preis</Label>
            <Input id="price" type="number" step="0.01" {...register('price')} disabled={isUploading}/>
            {errors.price && <p className="text-sm text-destructive mt-1">{errors.price.message}</p>}
          </div>
          <div>
            <Label htmlFor="category">Kategorie</Label>
            <Controller
                name="category"
                control={control}
                render={({ field }) => (
                    <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isUploading}>
                        <SelectTrigger>
                            <SelectValue placeholder="Wählen Sie eine Kategorie" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Mischung">Mischung</SelectItem>
                            <SelectItem value="Sortenrein">Sortenrein</SelectItem>
                            <SelectItem value="Aromatisiert">Aromatisiert</SelectItem>
                        </SelectContent>
                    </Select>
                )}
            />
             {errors.category && <p className="text-sm text-destructive mt-1">{errors.category.message}</p>}
          </div>
          <div>
            <Label htmlFor="intensity">Intensität</Label>
             <Controller
                name="intensity"
                control={control}
                render={({ field }) => (
                     <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isUploading}>
                        <SelectTrigger>
                            <SelectValue placeholder="Wählen Sie eine Intensität" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Mild">Mild</SelectItem>
                            <SelectItem value="Mittel">Mittel</SelectItem>
                            <SelectItem value="Robust">Robust</SelectItem>
                        </SelectContent>
                    </Select>
                )}
            />
            {errors.intensity && <p className="text-sm text-destructive mt-1">{errors.intensity.message}</p>}
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline" disabled={isUploading}>Abbrechen</Button>
            </DialogClose>
            <Button type="submit" disabled={isUploading}>{isUploading ? 'Speichern...' : 'Speichern'}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
