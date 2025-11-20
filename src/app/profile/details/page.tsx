"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../../../components/ui/card";
import { useAuth } from "../../../hooks/use-auth";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { Button } from "../../../components/ui/button";
import { useToast } from "../../../hooks/use-toast";
import { useState } from "react";

export const dynamic = "force-dynamic";

export default function UserDetailsPage() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [displayName, setDisplayName] = useState(user?.displayName || "");
  const [email, setEmail] = useState(user?.email || "");

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would call a function to update user details in Firebase Auth
    toast({
      title: "Profil aktualisiert",
      description: "Ihre Daten wurden gespeichert.",
    });
  };

  if (!user) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Meine Daten</CardTitle>
          <CardDescription>
            Bitte melden Sie sich an, um Ihre Daten anzuzeigen.
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Meine Daten</CardTitle>
        <CardDescription>
          Sehen und aktualisieren Sie Ihre persönlichen Informationen.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleUpdate} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="displayName">Vollständiger Name</Label>
            <Input
              id="displayName"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">E-Mail-Adresse</Label>
            <Input id="email" type="email" value={email} disabled />
            <p className="text-xs text-muted-foreground">
              E-Mail-Adresse kann nicht geändert werden.
            </p>
          </div>
          <Button type="submit">Profil aktualisieren</Button>
        </form>
      </CardContent>
    </Card>
  );
}
