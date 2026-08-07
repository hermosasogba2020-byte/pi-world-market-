import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, MapPin, Briefcase, DollarSign, Clock, ChevronDown } from "lucide-react";
import { Link } from "wouter";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Jobs() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);

  const jobTypes = [
    { id: "full-time", name: "Temps plein" },
    { id: "part-time", name: "Temps partiel" },
    { id: "contract", name: "Contrat" },
    { id: "freelance", name: "Freelance" },
    { id: "temporary", name: "Temporaire" },
  ];

  const locations = [
    { id: "remote", name: "Télétravail" },
    { id: "paris", name: "Paris" },
    { id: "lyon", name: "Lyon" },
    { id: "marseille", name: "Marseille" },
    { id: "toulouse", name: "Toulouse" },
  ];

  // Mock jobs
  const mockJobs = useMemo(() => {
    const jobs = [
      {
        id: 1,
        title: "Développeur React Senior",
        company: "TechCorp",
        type: "full-time",
        location: "remote",
        salary: "55-75k",
        posted: "Il y a 2 jours",
        icon: "💻",
      },
      {
        id: 2,
        title: "Designer UX/UI",
        company: "Creative Studio",
        type: "full-time",
        location: "paris",
        salary: "40-50k",
        posted: "Il y a 5 jours",
        icon: "🎨",
      },
      {
        id: 3,
        title: "Consultant Marketing Digital",
        company: "Marketing Pro",
        type: "contract",
        location: "remote",
        salary: "45-60k",
        posted: "Il y a 1 jour",
        icon: "📊",
      },
      {
        id: 4,
        title: "Freelancer - Développeur Node.js",
        company: "Startup Hub",
        type: "freelance",
        location: "remote",
        salary: "50-70€/h",
        posted: "Il y a 3 jours",
        icon: "⚙️",
      },
      {
        id: 5,
        title: "Chef de Projet IT",
        company: "Enterprise Solutions",
        type: "full-time",
        location: "lyon",
        salary: "48-62k",
        posted: "Il y a 4 jours",
        icon: "📋",
      },
      {
        id: 6,
        title: "Spécialiste SEO",
        company: "Digital Agency",
        type: "part-time",
        location: "remote",
        salary: "25-35k",
        posted: "Il y a 6 jours",
        icon: "🔍",
      },
    ];

    return jobs.filter(j => {
      const matchesSearch = j.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesType = !selectedType || j.type === selectedType;
      const matchesLocation = !selectedLocation || j.location === selectedLocation;
      return matchesSearch && matchesType && matchesLocation;
    });
  }, [searchQuery, selectedType, selectedLocation]);

  return (
    <div className="w-full">
      {/* Header */}
      <section className="section-padding-sm bg-muted/30 border-b border-border">
        <div className="container">
          <h1 className="text-4xl font-bold mb-2">Emploi & Freelance</h1>
          <p className="text-lg text-muted-foreground">
            Trouvez l'opportunité professionnelle qui vous correspond
          </p>
        </div>
      </section>

      {/* Main content */}
      <div className="container py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar - Filters */}
          <div className="lg:col-span-1">
            <div className="sticky top-20 space-y-6">
              {/* Search */}
              <div>
                <h3 className="font-semibold mb-3">Rechercher</h3>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Titre du poste..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>

              {/* Job Type */}
              <div>
                <h3 className="font-semibold mb-3">Type de poste</h3>
                <div className="space-y-2">
                  <button
                    onClick={() => setSelectedType(null)}
                    className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                      selectedType === null
                        ? "bg-accent text-accent-foreground font-medium"
                        : "hover:bg-muted"
                    }`}
                  >
                    Tous les types
                  </button>
                  {jobTypes.map((type) => (
                    <button
                      key={type.id}
                      onClick={() => setSelectedType(type.id)}
                      className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                        selectedType === type.id
                          ? "bg-accent text-accent-foreground font-medium"
                          : "hover:bg-muted"
                      }`}
                    >
                      {type.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Location */}
              <div>
                <h3 className="font-semibold mb-3">Localisation</h3>
                <div className="space-y-2">
                  <button
                    onClick={() => setSelectedLocation(null)}
                    className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                      selectedLocation === null
                        ? "bg-accent text-accent-foreground font-medium"
                        : "hover:bg-muted"
                    }`}
                  >
                    Toutes les localisations
                  </button>
                  {locations.map((loc) => (
                    <button
                      key={loc.id}
                      onClick={() => setSelectedLocation(loc.id)}
                      className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                        selectedLocation === loc.id
                          ? "bg-accent text-accent-foreground font-medium"
                          : "hover:bg-muted"
                      }`}
                    >
                      {loc.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Main content - Jobs */}
          <div className="lg:col-span-3">
            {/* Sort options */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-muted-foreground">
                {mockJobs.length} offres trouvées
              </p>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="gap-2">
                    Trier par
                    <ChevronDown className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Plus récent</DropdownMenuItem>
                  <DropdownMenuItem>Plus pertinent</DropdownMenuItem>
                  <DropdownMenuItem>Salaire: bas à haut</DropdownMenuItem>
                  <DropdownMenuItem>Salaire: haut à bas</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Jobs list */}
            {mockJobs.length > 0 ? (
              <div className="space-y-4">
                {mockJobs.map((job) => (
                  <Link key={job.id} href={`/job/${job.id}`}>
                    <a className="group card-hover card p-6 no-underline flex gap-4">
                      {/* Icon */}
                      <div className="w-16 h-16 bg-muted/50 rounded-lg flex items-center justify-center text-2xl flex-shrink-0">
                        {job.icon}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-lg mb-1">{job.title}</h3>
                        <p className="text-sm text-muted-foreground mb-3">{job.company}</p>

                        {/* Info */}
                        <div className="flex flex-wrap gap-4 text-sm">
                          <div className="flex items-center gap-1 text-muted-foreground">
                            <Briefcase className="w-4 h-4" />
                            {job.type === "full-time"
                              ? "Temps plein"
                              : job.type === "part-time"
                              ? "Temps partiel"
                              : job.type === "contract"
                              ? "Contrat"
                              : job.type === "freelance"
                              ? "Freelance"
                              : "Temporaire"}
                          </div>
                          <div className="flex items-center gap-1 text-muted-foreground">
                            <MapPin className="w-4 h-4" />
                            {job.location === "remote"
                              ? "Télétravail"
                              : job.location === "paris"
                              ? "Paris"
                              : job.location === "lyon"
                              ? "Lyon"
                              : job.location === "marseille"
                              ? "Marseille"
                              : "Toulouse"}
                          </div>
                          <div className="flex items-center gap-1 text-muted-foreground">
                            <DollarSign className="w-4 h-4" />
                            {job.salary}
                          </div>
                          <div className="flex items-center gap-1 text-muted-foreground">
                            <Clock className="w-4 h-4" />
                            {job.posted}
                          </div>
                        </div>
                      </div>

                      {/* Button */}
                      <div className="flex-shrink-0">
                        <Button variant="outline">Postuler</Button>
                      </div>
                    </a>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-lg text-muted-foreground">
                  Aucune offre ne correspond à vos critères
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
