
'use server';

import { z } from 'zod';
import { suggestFoodPairings } from '../ai/flows/suggest-food-pairings';

const SuggestFoodPairingsSchema = z.object({
  origin: z.string(),
  acidity: z.string(),
  tastingNotes: z.string(),
});

type State = {
  pairings: string;
  recipes: string;
  error?: string | null;
};

export async function getFoodPairingSuggestions(prevState: State, formData: FormData): Promise<State> {
  const validatedFields = SuggestFoodPairingsSchema.safeParse({
    origin: formData.get('origin'),
    acidity: formData.get('acidity'),
    tastingNotes: formData.get('tastingNotes'),
  });

  if (!validatedFields.success) {
    return {
      pairings: '',
      recipes: '',
      error: 'Ungültige Eingabe. Bitte füllen Sie alle Felder aus.',
    };
  }

  try {
    const result = await suggestFoodPairings(validatedFields.data);
    return {
      pairings: result.pairings,
      recipes: result.recipes,
      error: null,
    };
  } catch (error) {
    console.error('Fehler beim Abrufen von Vorschlägen für Lebensmittelkombinationen:', error);
    return {
      pairings: '',
      recipes: '',
      error: 'Ein unerwarteter Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.',
    };
  }
}
