import { MapPin, Calendar, Users, Star, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";

interface TravelCardProps {
  id: number;
  title: string;
  destination: string;
  type: "tour" | "transport" | "accommodation" | "package";
  price: number;
  image?: string;
  departureDate?: string;
  capacity?: number;
  booked?: number;
  rating?: number;
  totalReviews?: number;
  isFavorited?: boolean;
  onFavoriteToggle?: (id: number) => void;
}

export function TravelCard({
  id,
  title,
  destination,
  type,
  price,
  image,
  departureDate,
  capacity = 0,
  booked = 0,
  rating = 0,
  totalReviews = 0,
  isFavorited = false,
  onFavoriteToggle,
}: TravelCardProps) {
  const typeColors = {
    tour: "bg-blue-100 text-blue-800",
    transport: "bg-green-100 text-green-800",
    accommodation: "bg-orange-100 text-orange-800",
    package: "bg-purple-100 text-purple-800",
  };

  const typeLabels = {
    tour: "Visite guidée",
    transport: "Transport",
    accommodation: "Hébergement",
    package: "Forfait",
  };

  const availableSpots = capacity ? capacity - booked : 0;

  return (
    <div className="group bg-white rounded-lg border border-border overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {/* Image Container */}
      <div className="relative w-full aspect-video bg-muted overflow-hidden">
        {image ? (
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/10 to-primary/5">
            <MapPin className="w-8 h-8 text-muted-foreground" />
          </div>
        )}

        {/* Type Badge */}
        <Badge className={`absolute top-2 right-2 ${typeColors[type]}`}>
          {typeLabels[type]}
        </Badge>

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
        {/* Title */}
        <Link href={`/travel/${id}`}>
          <a className="block font-semibold text-sm line-clamp-2 hover:text-primary transition-colors">
            {title}
          </a>
        </Link>

        {/* Destination */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="w-4 h-4 flex-shrink-0" />
          <span>{destination}</span>
        </div>

        {/* Departure Date */}
        {departureDate && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="w-4 h-4 flex-shrink-0" />
            <span>{new Date(departureDate).toLocaleDateString("fr-FR")}</span>
          </div>
        )}

        {/* Rating */}
        {rating > 0 && (
          <div className="flex items-center gap-2">
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

        {/* Availability and Price */}
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Users className="w-4 h-4" />
            <span>{availableSpots} places disponibles</span>
          </div>
          <span className="text-lg font-bold text-foreground">${price.toFixed(2)}</span>
        </div>

        {/* Book Button */}
        <Button className="w-full" size="sm">
          Réserver
        </Button>
      </div>
    </div>
  );
}
