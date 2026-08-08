import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Star, ThumbsUp, Flag } from "lucide-react";

export default function Reviews() {
  const reviews = [
    {
      id: 1,
      author: "Jean Dupont",
      rating: 5,
      title: "Excellent produit!",
      text: "Très satisfait de mon achat.",
      date: "2024-06-20",
      helpful: 24,
      verified: true,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold">Avis et Évaluations</h1>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        <div className="space-y-4">
          {reviews.map((review) => (
            <Card key={review.id} className="p-6">
              <div className="flex justify-between mb-3">
                <div>
                  <p className="font-semibold">{review.author}</p>
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < review.rating
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-muted-foreground"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <h3 className="font-semibold mb-2">{review.title}</h3>
              <p className="text-muted-foreground mb-4">{review.text}</p>
              <div className="flex gap-4">
                <button className="flex items-center gap-1 text-muted-foreground hover:text-foreground">
                  <ThumbsUp className="w-4 h-4" />
                  Utile ({review.helpful})
                </button>
              </div>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
