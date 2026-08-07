import { useState } from "react";
import { Heart, Share2, ShoppingCart, Star, Truck, Shield, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useParams } from "wouter";

export default function ProductDetail() {
  const params = useParams();
  const productId = params.id ? parseInt(params.id) : 0;
  const [quantity, setQuantity] = useState(1);
  const [isFavorited, setIsFavorited] = useState(false);

  // Mock data - replace with actual API call
  const product = {
    id: productId,
    name: "Premium Wireless Headphones",
    price: 199.99,
    discountPrice: 149.99,
    rating: 4.5,
    totalReviews: 328,
    images: [
      "https://via.placeholder.com/500x500?text=Product+1",
      "https://via.placeholder.com/500x500?text=Product+2",
      "https://via.placeholder.com/500x500?text=Product+3",
    ],
    description: "Experience premium sound quality with our latest wireless headphones. Featuring active noise cancellation, 30-hour battery life, and premium comfort design.",
    shopName: "TechStore Pro",
    shopRating: 4.8,
    stock: 45,
    category: "Electronics",
    specifications: {
      "Driver Size": "40mm",
      "Frequency Response": "20Hz - 20kHz",
      "Impedance": "32Ω",
      "Bluetooth": "5.0",
      "Battery": "30 hours",
    },
    features: [
      "Active Noise Cancellation",
      "30-hour battery life",
      "Premium comfort design",
      "Bluetooth 5.0",
      "Touch controls",
    ],
  };

  const reviews = [
    { id: 1, author: "John Doe", rating: 5, text: "Excellent product! Great sound quality.", date: "2024-06-10" },
    { id: 2, author: "Jane Smith", rating: 4, text: "Good value for money. Comfortable to wear.", date: "2024-06-08" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-white border-b border-border sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Détails du produit</h1>
            <Button variant="ghost" size="icon">
              <Share2 className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Images */}
          <div className="space-y-4">
            <div className="bg-muted rounded-lg aspect-square overflow-hidden">
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  className="bg-muted rounded-lg aspect-square overflow-hidden hover:ring-2 ring-primary transition-all"
                >
                  <img src={img} alt={`View ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Details */}
          <div className="space-y-6">
            {/* Title and Rating */}
            <div>
              <div className="flex items-start justify-between gap-4 mb-3">
                <h1 className="text-3xl font-bold">{product.name}</h1>
                <button
                  onClick={() => setIsFavorited(!isFavorited)}
                  className="p-2 rounded-full hover:bg-muted transition-colors"
                >
                  <Heart
                    className={`w-6 h-6 ${isFavorited ? "fill-red-500 text-red-500" : "text-muted-foreground"}`}
                  />
                </button>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.round(product.rating)
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-muted-foreground"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  {product.rating} ({product.totalReviews} avis)
                </span>
              </div>
            </div>

            <Separator />

            {/* Price */}
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <span className="text-4xl font-bold text-foreground">${product.discountPrice}</span>
                <span className="text-xl text-muted-foreground line-through">${product.price}</span>
                <Badge className="bg-red-100 text-red-800">
                  -{Math.round(((product.price - product.discountPrice) / product.price) * 100)}%
                </Badge>
              </div>
            </div>

            {/* Shop Info */}
            <div className="bg-muted rounded-lg p-4">
              <p className="text-sm text-muted-foreground mb-2">Vendu par</p>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold">{product.shopName}</p>
                  <div className="flex items-center gap-1 mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < Math.round(product.shopRating)
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-muted-foreground"
                        }`}
                      />
                    ))}
                    <span className="text-xs text-muted-foreground ml-1">{product.shopRating}</span>
                  </div>
                </div>
                <Button variant="outline">Visiter la boutique</Button>
              </div>
            </div>

            {/* Quantity and Add to Cart */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-border rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-2 hover:bg-muted transition-colors"
                  >
                    −
                  </button>
                  <span className="px-6 py-2 font-semibold">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-2 hover:bg-muted transition-colors"
                  >
                    +
                  </button>
                </div>
                <span className="text-sm text-muted-foreground">{product.stock} en stock</span>
              </div>

              <Button className="w-full py-6 text-lg" size="lg">
                <ShoppingCart className="w-5 h-5 mr-2" />
                Ajouter au panier
              </Button>
            </div>

            {/* Shipping Info */}
            <div className="space-y-3 border-t border-border pt-6">
              <div className="flex items-start gap-3">
                <Truck className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-sm">Livraison gratuite</p>
                  <p className="text-xs text-muted-foreground">Livraison standard en 3-5 jours</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-sm">Garantie 2 ans</p>
                  <p className="text-xs text-muted-foreground">Protection complète du produit</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <RotateCcw className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-sm">Retour facile</p>
                  <p className="text-xs text-muted-foreground">30 jours pour changer d'avis</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Specifications and Features */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
          <div>
            <h2 className="text-2xl font-bold mb-6">Caractéristiques</h2>
            <div className="space-y-4">
              {Object.entries(product.specifications).map(([key, value]) => (
                <div key={key} className="flex justify-between py-2 border-b border-border">
                  <span className="text-muted-foreground">{key}</span>
                  <span className="font-semibold">{value}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-6">Caractéristiques principales</h2>
            <ul className="space-y-3">
              {product.features.map((feature, idx) => (
                <li key={idx} className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Reviews */}
        <div className="mt-12 border-t border-border pt-8">
          <h2 className="text-2xl font-bold mb-6">Avis des clients</h2>
          <div className="space-y-4">
            {reviews.map((review) => (
              <div key={review.id} className="bg-muted rounded-lg p-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="font-semibold">{review.author}</p>
                    <div className="flex items-center gap-1 mt-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3.5 h-3.5 ${
                            i < review.rating
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-muted-foreground"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground">{review.date}</span>
                </div>
                <p className="text-sm text-muted-foreground">{review.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
