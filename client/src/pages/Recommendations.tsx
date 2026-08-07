import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Star, Heart, ShoppingCart, TrendingUp } from "lucide-react";
import { useState } from "react";

export default function Recommendations() {
  const [liked, setLiked] = useState<number[]>([]);

  const recommendations = [
    {
      id: 1,
      name: "Laptop Premium",
      category: "Électronique",
      price: 899,
      rating: 4.8,
      reviews: 234,
      image: "💻",
      reason: "Basé sur vos achats récents",
      discount: "10%",
    },
    {
      id: 2,
      name: "Souris Wireless",
      category: "Accessoires",
      price: 45,
      rating: 4.6,
      reviews: 156,
      image: "🖱️",
      reason: "Populaire dans votre catégorie",
      discount: "15%",
    },
    {
      id: 3,
      name: "Clavier Mécanique",
      category: "Accessoires",
      price: 120,
      rating: 4.9,
      reviews: 312,
      image: "⌨️",
      reason: "Vu par des clients similaires",
      discount: "5%",
    },
    {
      id: 4,
      name: "Écran 4K",
      category: "Électronique",
      price: 599,
      rating: 4.7,
      reviews: 189,
      image: "🖥️",
      reason: "Tendance cette semaine",
      discount: "20%",
    },
    {
      id: 5,
      name: "Webcam 1080p",
      category: "Accessoires",
      price: 79,
      rating: 4.5,
      reviews: 98,
      image: "📷",
      reason: "Complément populaire",
      discount: "12%",
    },
    {
      id: 6,
      name: "Casque Audio",
      category: "Audio",
      price: 199,
      rating: 4.8,
      reviews: 267,
      image: "🎧",
      reason: "Basé sur vos préférences",
      discount: "8%",
    },
  ];

  const toggleLike = (id: number) => {
    setLiked(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold">Recommandations Personnalisées</h1>
          <p className="text-muted-foreground">
            Découvrez des produits sélectionnés pour vous
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Filter Tabs */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {["Tous", "Électronique", "Accessoires", "Audio", "Tendance"].map(
            (tab) => (
              <Button
                key={tab}
                variant={tab === "Tous" ? "default" : "outline"}
                size="sm"
              >
                {tab}
              </Button>
            )
          )}
        </div>

        {/* Recommendations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recommendations.map((item) => (
            <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              {/* Image Section */}
              <div className="relative bg-gradient-to-br from-muted to-muted/50 p-8 text-center">
                <div className="text-6xl mb-2">{item.image}</div>
                {item.discount && (
                  <div className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                    -{item.discount}
                  </div>
                )}
                <p className="text-xs text-muted-foreground">{item.reason}</p>
              </div>

              {/* Content Section */}
              <div className="p-4">
                <p className="text-xs text-muted-foreground mb-1">
                  {item.category}
                </p>
                <h3 className="font-semibold line-clamp-2 mb-2">{item.name}</h3>

                {/* Rating */}
                <div className="flex items-center gap-1 mb-3">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3 h-3 ${
                          i < Math.floor(item.rating)
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-muted-foreground"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {item.rating} ({item.reviews})
                  </span>
                </div>

                {/* Price */}
                <div className="mb-4">
                  <p className="text-2xl font-bold">{item.price} Pi</p>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <Button className="flex-1" size="sm">
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Ajouter
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => toggleLike(item.id)}
                  >
                    <Heart
                      className={`w-4 h-4 ${
                        liked.includes(item.id)
                          ? "fill-red-500 text-red-500"
                          : ""
                      }`}
                    />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            Charger plus de recommandations
          </Button>
        </div>
      </main>
    </div>
  );
}
