import { Heart, Star, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";

interface ProductCardProps {
  id: number;
  name: string;
  price: number;
  discountPrice?: number;
  image?: string;
  rating?: number;
  totalReviews?: number;
  shopName?: string;
  isFavorited?: boolean;
  onFavoriteToggle?: (id: number) => void;
}

export function ProductCard({
  id,
  name,
  price,
  discountPrice,
  image,
  rating = 0,
  totalReviews = 0,
  shopName,
  isFavorited = false,
  onFavoriteToggle,
}: ProductCardProps) {
  const discount = discountPrice ? Math.round(((price - discountPrice) / price) * 100) : 0;

  return (
    <div className="group relative bg-white rounded-lg border border-border overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {/* Image Container */}
      <div className="relative w-full aspect-square bg-muted overflow-hidden">
        {image ? (
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/10 to-primary/5">
            <ShoppingCart className="w-8 h-8 text-muted-foreground" />
          </div>
        )}

        {/* Discount Badge */}
        {discount > 0 && (
          <Badge className="absolute top-2 right-2 bg-red-500 hover:bg-red-600">
            -{discount}%
          </Badge>
        )}

        {/* Favorite Button */}
        <button
          onClick={() => onFavoriteToggle?.(id)}
          className="absolute top-2 left-2 p-2 rounded-full bg-white/90 hover:bg-white shadow-sm transition-colors"
        >
          <Heart
            className={`w-5 h-5 ${isFavorited ? "fill-red-500 text-red-500" : "text-muted-foreground"}`}
          />
        </button>
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Shop Name */}
        {shopName && (
          <p className="text-xs text-muted-foreground font-medium">{shopName}</p>
        )}

        {/* Product Name */}
        <Link href={`/product/${id}`}>
          <a className="block font-semibold text-sm line-clamp-2 hover:text-primary transition-colors">
            {name}
          </a>
        </Link>

        {/* Rating */}
        {rating > 0 && (
          <div className="flex items-center gap-1">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3.5 h-3.5 ${
                    i < Math.round(rating) ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-muted-foreground">({totalReviews})</span>
          </div>
        )}

        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-foreground">
            ${discountPrice ? discountPrice.toFixed(2) : price.toFixed(2)}
          </span>
          {discountPrice && (
            <span className="text-sm text-muted-foreground line-through">
              ${price.toFixed(2)}
            </span>
          )}
        </div>

        {/* Add to Cart Button */}
        <Button className="w-full" size="sm">
          <ShoppingCart className="w-4 h-4 mr-2" />
          Ajouter au panier
        </Button>
      </div>
    </div>
  );
}
