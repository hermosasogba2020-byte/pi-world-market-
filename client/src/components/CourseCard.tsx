import { BookOpen, Star, Users, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";

interface CourseCardProps {
  id: number;
  title: string;
  price: number;
  thumbnail?: string;
  level?: "beginner" | "intermediate" | "advanced";
  rating?: number;
  totalReviews?: number;
  totalStudents?: number;
  duration?: number;
  trainerName?: string;
}

export function CourseCard({
  id,
  title,
  price,
  thumbnail,
  level = "beginner",
  rating = 0,
  totalReviews = 0,
  totalStudents = 0,
  duration = 0,
  trainerName,
}: CourseCardProps) {
  const levelColors = {
    beginner: "bg-green-100 text-green-800",
    intermediate: "bg-blue-100 text-blue-800",
    advanced: "bg-purple-100 text-purple-800",
  };

  return (
    <div className="group bg-white rounded-lg border border-border overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {/* Thumbnail */}
      <div className="relative w-full aspect-video bg-muted overflow-hidden">
        {thumbnail ? (
          <img
            src={thumbnail}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/10 to-primary/5">
            <BookOpen className="w-8 h-8 text-muted-foreground" />
          </div>
        )}

        {/* Level Badge */}
        <Badge className={`absolute top-2 right-2 ${levelColors[level]}`}>
          {level.charAt(0).toUpperCase() + level.slice(1)}
        </Badge>
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Trainer Name */}
        {trainerName && (
          <p className="text-xs text-muted-foreground font-medium">{trainerName}</p>
        )}

        {/* Course Title */}
        <Link href={`/course/${id}`}>
          <a className="block font-semibold text-sm line-clamp-2 hover:text-primary transition-colors">
            {title}
          </a>
        </Link>

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

        {/* Stats */}
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          {duration > 0 && (
            <div className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {duration}h
            </div>
          )}
          {totalStudents > 0 && (
            <div className="flex items-center gap-1">
              <Users className="w-3.5 h-3.5" />
              {totalStudents} étudiants
            </div>
          )}
        </div>

        {/* Price and Button */}
        <div className="flex items-center justify-between pt-2">
          <span className="text-lg font-bold text-foreground">${price.toFixed(2)}</span>
          <Button size="sm" variant="outline">
            Voir plus
          </Button>
        </div>
      </div>
    </div>
  );
}
