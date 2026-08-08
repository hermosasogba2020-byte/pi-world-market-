import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, MapPin, Calendar, Users, Star, ChevronDown } from "lucide-react";
import { Link } from "wouter";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Travels() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const travelTypes = [
    { id: "tour", name: "Tours guidés" },
    { id: "transport", name: "Transport" },
    { id: "accommodation", name: "Hébergement" },
    { id: "package", name: "Forfaits complets" },
  ];

  // Mock travels
  const mockTravels = useMemo(() => {
    const travels = [
      {
        id: 1,
        title: "Paris - 5 jours",
        type: "package",
        destination: "Paris",
        price: 1200,
        rating: 4.8,
        reviews: 234,
        capacity: 20,
        booked: 18,
        icon: "🗼",
        date: "15-20 Juillet",
      },
      {
        id: 2,
        title: "Croisière Méditerranée",
        type: "tour",
        destination: "Méditerranée",
        price: 2500,
        rating: 4.9,
        reviews: 567,
        capacity: 100,
        booked: 95,
        icon: "🚢",
        date: "1-15 Août",
      },
      {
        id: 3,
        title: "Vol Paris - New York",
        type: "transport",
        destination: "New York",
        price: 450,
        rating: 4.6,
        reviews: 892,
        capacity: 300,
        booked: 280,
        icon: "✏️",
        date: "Quotidien",
      },
      {
        id: 4,
        title: "Hôtel 4 étoiles - Barcelone",
        type: "accommodation",
        destination: "Barcelone",
        price: 150,
        rating: 4.7,
        reviews: 345,
        capacity: 50,
        booked: 42,
        icon: "🏨",
        date: "Flexible",
      },
      {
        id: 5,
        title: "Safari en Afrique",
        type: "tour",
        destination: "Kenya",
        price: 3500,
        rating: 4.9,
        reviews: 456,
        capacity: 15,
        booked: 12,
        icon: "🦁",
        date: "20-30 Septembre",
      },
      {
        id: 6,
        title: "Randonnée - Alpes",
        type: "tour",
        destination: "Alpes",
        price: 800,
        rating: 4.5,
        reviews: 234,
        capacity: 25,
        booked: 20,
        icon: "⛰️",
        date: "1-7 Août",
      },
    ];

    return travels.filter(t => {
      const matchesSearch = t.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesType = !selectedType || t.type === selectedType;
      return matchesSearch && matchesType;
    });
  }, [searchQuery, selectedType]);

  return (
    <div className="w-full">
      {/* Header */}
      <section className="section-padding-sm bg-muted/30 border-b border-border">
        <div className="container">
          <h1 className="text-4xl font-bold mb-2">Voyages & Transport</h1>
          <p className="text-lg text-muted-foreground">
            Explorez le monde avec nos {mockTravels.length} offres de voyage
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
                    placeholder="Destination..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>

              {/* Travel Type */}
              <div>
                <h3 className="font-semibold mb-3">Type de voyage</h3>
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
                  {travelTypes.map((type) => (
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

              {/* Price range */}
              <div>
                <h3 className="font-semibold mb-3">Budget</h3>
                <div className="space-y-3">
                  <button className="w-full text-left px-3 py-2 rounded-md text-sm hover:bg-muted transition-colors">
                    Moins de 500€
                  </button>
                  <button className="w-full text-left px-3 py-2 rounded-md text-sm hover:bg-muted transition-colors">
                    500€ - 1500€
                  </button>
                  <button className="w-full text-left px-3 py-2 rounded-md text-sm hover:bg-muted transition-colors">
                    1500€ - 5000€
                  </button>
                  <button className="w-full text-left px-3 py-2 rounded-md text-sm hover:bg-muted transition-colors">
                    Plus de 5000€
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Main content - Travels */}
          <div className="lg:col-span-3">
            {/* Sort options */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-muted-foreground">
                {mockTravels.length} offres trouvées
              </p>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="gap-2">
                    Trier par
                    <ChevronDown className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Plus populaire</DropdownMenuItem>
                  <DropdownMenuItem>Meilleure évaluation</DropdownMenuItem>
                  <DropdownMenuItem>Prix: bas à haut</DropdownMenuItem>
                  <DropdownMenuItem>Prix: haut à bas</DropdownMenuItem>
                  <DropdownMenuItem>Plus récent</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Travels grid */}
            {mockTravels.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {mockTravels.map((travel) => (
                  <Link key={travel.id} href={`/travel/${travel.id}`}>
                    <a className="group card-hover card overflow-hidden no-underline">
                      {/* Image */}
                      <div className="aspect-video bg-muted/50 flex items-center justify-center text-6xl group-hover:bg-muted transition-colors relative">
                        {travel.icon}
                        <div className="absolute top-2 right-2 px-3 py-1 rounded-full bg-background/80 text-sm font-medium">
                          {travel.price}€
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-4">
                        <h3 className="font-semibold text-lg line-clamp-2 mb-2">
                          {travel.title}
                        </h3>

                        {/* Info */}
                        <div className="space-y-3 mb-4">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <MapPin className="w-4 h-4" />
                            {travel.destination}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Calendar className="w-4 h-4" />
                            {travel.date}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Users className="w-4 h-4" />
                            {travel.booked}/{travel.capacity} places
                          </div>
                        </div>

                        {/* Rating */}
                        <div className="flex items-center gap-2 mb-4">
                          <div className="flex gap-0.5">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-3 h-3 ${
                                  i < Math.floor(travel.rating)
                                    ? "fill-yellow-400 text-yellow-400"
                                    : "text-muted-foreground"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-xs text-muted-foreground">
                            ({travel.reviews})
                          </span>
                        </div>

                        {/* Button */}
                        <Button className="w-full">Réserver</Button>
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
