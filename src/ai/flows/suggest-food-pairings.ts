// This is a server-side file.
'use server';

/**
 * @fileOverview Stellt Vorschläge für Lebensmittelkombinationen basierend auf den Eigenschaften von Olivenöl bereit.
 *
 * - suggestFoodPairings - Eine Funktion, die Olivenöl-Attribute entgegennimmt und Vorschläge für Lebensmittelkombinationen zurückgibt.
 * - SuggestFoodPairingsInput - Der Eingabetyp für die Funktion suggestFoodPairings.
 * - SuggestFoodPairingsOutput - Der Rückgabetyp für die Funktion suggestFoodPairings.
 */

import {ai} from '../genkit';
import {z} from 'genkit';

const SuggestFoodPairingsInputSchema = z.object({
  origin: z.string().describe('Die Herkunft des Olivenöls.'),
  acidity: z.string().describe('Der Säuregehalt des Olivenöls.'),
  tastingNotes: z.string().describe('Die Geschmacksnoten des Olivenöls.'),
});
export type SuggestFoodPairingsInput = z.infer<typeof SuggestFoodPairingsInputSchema>;

const SuggestFoodPairingsOutputSchema = z.object({
  pairings: z.string().describe('Eine Liste von vorgeschlagenen Lebensmittelkombinationen basierend auf den Olivenöl-Attributen.'),
  recipes: z.string().describe('Eine Liste von vorgeschlagenen Rezepten, die das Olivenöl ergänzen.'),
});
export type SuggestFoodPairingsOutput = z.infer<typeof SuggestFoodPairingsOutputSchema>;

export async function suggestFoodPairings(input: SuggestFoodPairingsInput): Promise<SuggestFoodPairingsOutput> {
  return suggestFoodPairingsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestFoodPairingsPrompt',
  input: {schema: SuggestFoodPairingsInputSchema},
  output: {schema: SuggestFoodPairingsOutputSchema},
  prompt: `Sie sind ein erstklassiger Koch mit umfassenden Kenntnissen über Olivenöle. Basierend auf den Attributen des Olivenöls, geben Sie Vorschläge für Lebensmittelkombinationen und ergänzende Rezepte.

Herkunft des Olivenöls: {{{origin}}}
Säuregehalt: {{{acidity}}}
Geschmacksnoten: {{{tastingNotes}}}

Geben Sie Kombinationen, die das kulinarische Erlebnis verbessern, und ergänzende Rezepte an.
`,
});

const suggestFoodPairingsFlow = ai.defineFlow(
  {
    name: 'suggestFoodPairingsFlow',
    inputSchema: SuggestFoodPairingsInputSchema,
    outputSchema: SuggestFoodPairingsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
