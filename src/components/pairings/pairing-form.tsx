"use client";

import { useState } from "react";

type Props = {
  onResult: (data: any) => void;
};

export default function PairingsForm({ onResult }: Props) {
  const [flavor, setFlavor] = useState("fruity");
  const [intensity, setIntensity] = useState<"mild" | "medium" | "robust">(
    "medium"
  );
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/pairings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ flavor, intensity }),
      });
      const json = await res.json();
      onResult(json);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 max-w-xl">
      <label className="flex flex-col">
        Flavor profile
        <input
          value={flavor}
          onChange={(e) => setFlavor(e.target.value)}
          className="mt-1 p-2 border rounded"
        />
      </label>

      <label className="flex flex-col">
        Intensity
        <select
          value={intensity}
          onChange={(e) => setIntensity(e.target.value as any)}
          className="mt-1 p-2 border rounded"
        >
          <option value="mild">Mild</option>
          <option value="medium">Medium</option>
          <option value="robust">Robust</option>
        </select>
      </label>

      <button
        type="submit"
        className="mt-2 inline-flex items-center px-4 py-2 bg-foreground text-background rounded"
        disabled={loading}
      >
        {loading ? "Thinking..." : "Suggest pairings"}
      </button>
    </form>
  );
}
