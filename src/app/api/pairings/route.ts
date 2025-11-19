import { NextResponse } from 'next/server';

type RequestBody = {
  flavor: string;
  intensity: 'mild' | 'medium' | 'robust';
  cuisine?: string;
};

export async function POST(req: Request) {
  const body: RequestBody = await req.json();

  // Mock AI response — replace with Genkit/GoogleAI call later
  const suggestions = [
    {
      title: `${body.intensity} ${body.flavor} olive oil with citrus notes`,
      pairings: ['Grilled fish', 'Citrus salad', 'Bruschetta'],
      recipe: `Drizzle over grilled fish with lemon, herbs, and a pinch of sea salt.`,
    },
  ];

  return NextResponse.json({ input: body, suggestions });
}
