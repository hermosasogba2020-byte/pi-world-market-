import { Briefcase, MapPin, DollarSign, Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";

interface JobCardProps {
  id: number;
  title: string;
  company?: string;
  location?: string;
  jobType: "full-time" | "part-time" | "contract" | "freelance" | "temporary";
  salaryMin?: number;
  salaryMax?: number;
  isSaved?: boolean;
  onSaveToggle?: (id: number) => void;
}

export function JobCard({
  id,
  title,
  company,
  location,
  jobType,
  salaryMin,
  salaryMax,
  isSaved = false,
  onSaveToggle,
}: JobCardProps) {
  const jobTypeColors = {
    "full-time": "bg-blue-100 text-blue-800",
    "part-time": "bg-green-100 text-green-800",
    contract: "bg-orange-100 text-orange-800",
    freelance: "bg-purple-100 text-purple-800",
    temporary: "bg-red-100 text-red-800",
  };

  const jobTypeLabels = {
    "full-time": "CDI",
    "part-time": "Temps partiel",
    contract: "Contrat",
    freelance: "Freelance",
    temporary: "Temporaire",
  };

  return (
    <div className="group bg-white rounded-lg border border-border p-4 hover:shadow-lg transition-shadow duration-300">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          {/* Company */}
          {company && (
            <p className="text-xs text-muted-foreground font-medium mb-1">{company}</p>
          )}

          {/* Job Title */}
          <Link href={`/job/${id}`}>
            <a className="block font-semibold text-base line-clamp-2 hover:text-primary transition-colors mb-2">
              {title}
            </a>
          </Link>

          {/* Job Type Badge */}
          <Badge className={jobTypeColors[jobType]}>
            {jobTypeLabels[jobType]}
          </Badge>
        </div>

        {/* Save Button */}
        <button
          onClick={() => onSaveToggle?.(id)}
          className="p-2 rounded-full hover:bg-muted transition-colors"
        >
          <Bookmark
            className={`w-5 h-5 ${isSaved ? "fill-primary text-primary" : "text-muted-foreground"}`}
          />
        </button>
      </div>

      {/* Details */}
      <div className="mt-4 space-y-2">
        {/* Location */}
        {location && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="w-4 h-4 flex-shrink-0" />
            <span>{location}</span>
          </div>
        )}

        {/* Salary */}
        {(salaryMin || salaryMax) && (
          <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
            <DollarSign className="w-4 h-4 flex-shrink-0" />
            <span>
              {salaryMin && salaryMax
                ? `$${salaryMin.toLocaleString()} - $${salaryMax.toLocaleString()}`
                : salaryMin
                  ? `À partir de $${salaryMin.toLocaleString()}`
                  : `Jusqu'à $${salaryMax?.toLocaleString()}`}
            </span>
          </div>
        )}
      </div>

      {/* Apply Button */}
      <Button className="w-full mt-4" size="sm">
        <Briefcase className="w-4 h-4 mr-2" />
        Postuler
      </Button>
    </div>
  );
}
