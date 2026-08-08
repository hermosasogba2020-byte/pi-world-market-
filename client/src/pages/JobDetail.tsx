import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";

export default function Page() {
  return (
    <div className="container section-padding">
      <h1 className="text-4xl font-bold mb-4">JobDetail en construction</h1>
      <p className="text-muted-foreground mb-6">Cette page sera bientôt disponible.</p>
      <Link href="/">
        <Button variant="outline">Retour à l'accueil</Button>
      </Link>
    </div>
  );
}
