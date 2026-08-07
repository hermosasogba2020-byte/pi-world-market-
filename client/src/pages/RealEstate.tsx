import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, MapPin, Home, Bed, Bath, Ruler, Heart, Phone, Mail } from "lucide-react";
import { Link } from "wouter";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function RealEstate() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000000]);
  const [sortBy, setSortBy] = useState("newest");

  const propertyTypes = [
    { id: "apartment", name: "Appartement", count: 1245 },
    { id: "house", name: "Maison", count: 892 },
    { id: "villa", name: "Villa", count: 456 },
    { id: "commercial", name: "Commercial", count: 234 },
    { id: "land", name: "Terrain", count: 567 },
  ];

  const mockProperties = useMemo(() => {
    const properties = [
      {
        id: 1,
        name: "Appartement Moderne 3 Pièces",
        type: "apartment",
        price: 250000,
        location: "Paris, 15ème",
        beds: 3,
        baths: 2,
        area: 85,
        image: "🏢",
        agent: "Marie Dupont",
        phone: "+33 6 12 34 56 78",
        isFavorite: false,
      },
      {
        id: 2,
        name: "Maison Familiale avec Jardin",
        type: "house",
        price: 450000,
        location: "Lyon, Presqu'île",
        beds: 4,
        baths: 3,
        area: 180,
        image: "🏠",
        agent: "Jean Martin",
        phone: "+33 6 98 76 54 32",
        isFavorite: false,
      },
      {
        id: 3,
        name: "Villa Luxe Vue Mer",
        type: "villa",
        price: 1200000,
        location: "Côte d'Azur",
        beds: 5,
        baths: 4,
        area: 350,
        image: "🏰",
        agent: "Sophie Bernard",
        phone: "+33 6 55 44 33 22",
        isFavorite: false,
      },
      {
        id: 4,
        name: "Local Commercial Centre-Ville",
        type: "commercial",
        price: 350000,
        location: "Marseille, Centre",
        beds: 0,
        baths: 1,
        area: 120,
        image: "🏬",
        agent: "Pierre Leclerc",
        phone: "+33 6 11 22 33 44",
        isFavorite: false,
      },
      {
        id: 5,
        name: "Terrain Constructible 2000m²",
        type: "land",
        price: 180000,
        location: "Toulouse, Périphérie",
        beds: 0,
        baths: 0,
        area: 2000,
        image: "🌳",
        agent: "Luc Rousseau",
        phone: "+33 6 77 88 99 00",
        isFavorite: false,
      },
      {
        id: 6,
        name: "Penthouse Luxe 2 Pièces",
        type: "apartment",
        price: 650000,
        location: "Paris, 8ème",
        beds: 2,
        baths: 2,
        area: 120,
        image: "🏢",
        agent: "Isabelle Moreau",
        phone: "+33 6 33 44 55 66",
        isFavorite: false,
      },
    ];

    return properties.filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           p.location.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesType = !selectedType || p.type === selectedType;
      const matchesPrice = p.price >= priceRange[0] && p.price <= priceRange[1];
      return matchesSearch && matchesType && matchesPrice;
    });
  }, [searchQuery, selectedType, priceRange]);

  return (
    <div className="w-full">
      {/* Header */}
      <section className="section-padding-sm bg-gradient-to-r from-blue-50 to-cyan-50 border-b border-border">
        <div className="container">
          <h1 className="text-4xl font-bold mb-2">Immobilier</h1>
          <p className="text-lg text-muted-foreground">
            Trouvez votre bien immobilier parmi {mockProperties.length} annonces
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
                    placeholder="Ville, région..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>

              {/* Property Types */}
              <div>
                <h3 className="font-semibold mb-3">Type de bien</h3>
                <div className="space-y-2">
                  <button
                    onClick={() => setSelectedType(null)}
                    className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                      selectedType === null
                        ? "bg-blue-100 text-blue-900 font-medium"
                        : "hover:bg-muted"
                    }`}
                  >
                    Tous les biens
                  </button>
                  {propertyTypes.map((type) => (
                    <button
                      key={type.id}
                      onClick={() => setSelectedType(type.id)}
                      className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors flex justify-between items-center ${
                        selectedType === type.id
                          ? "bg-blue-100 text-blue-900 font-medium"
                          : "hover:bg-muted"
                      }`}
                    >
                      <span>{type.name}</span>
                      <span className="text-xs opacity-70">({type.count})</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Price range */}
              <div>
                <h3 className="font-semibold mb-3">Prix</h3>
                <div className="space-y-3">
                  <div>
                    <label className="text-sm text-muted-foreground">
                      Min: {(priceRange[0] / 1000).toFixed(0)}k€
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="1000000"
                      step="50000"
                      value={priceRange[0]}
                      onChange={(e) =>
                        setPriceRange([Number(e.target.value), priceRange[1]])
                      }
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground">
                      Max: {(priceRange[1] / 1000).toFixed(0)}k€
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="1000000"
                      step="50000"
                      value={priceRange[1]}
                      onChange={(e) =>
                        setPriceRange([priceRange[0], Number(e.target.value)])
                      }
                      className="w-full"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main content - Properties */}
          <div className="lg:col-span-3">
            {/* Sort options */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-muted-foreground">
                {mockProperties.length} bien(s) trouvé(s)
              </p>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="gap-2">
                    Trier par
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setSortBy("newest")}>
                    Plus récent
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortBy("price-low")}>
                    Prix: bas à haut
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortBy("price-high")}>
                    Prix: haut à bas
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortBy("area")}>
                    Surface
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Properties grid */}
            {mockProperties.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {mockProperties.map((property) => (
                  <Link key={property.id} href={`/realestate/${property.id}`}>
                    <a className="group card-hover card overflow-hidden no-underline">
                      {/* Property image */}
                      <div className="aspect-video bg-gradient-to-br from-blue-100 to-cyan-100 flex items-center justify-center text-6xl group-hover:from-blue-200 group-hover:to-cyan-200 transition-colors relative">
                        {property.image}
                        <button className="absolute top-2 right-2 p-2 rounded-full bg-background/80 hover:bg-background transition-colors opacity-0 group-hover:opacity-100">
                          <Heart className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Property info */}
                      <div className="p-4">
                        <h3 className="font-semibold line-clamp-2 mb-2">
                          {property.name}
                        </h3>

                        {/* Location */}
                        <div className="flex items-center gap-1 text-sm text-muted-foreground mb-3">
                          <MapPin className="w-4 h-4" />
                          {property.location}
                        </div>

                        {/* Features */}
                        <div className="flex gap-4 text-sm mb-4 pb-4 border-b border-border">
                          {property.beds > 0 && (
                            <div className="flex items-center gap-1">
                              <Bed className="w-4 h-4 text-muted-foreground" />
                              <span>{property.beds}</span>
                            </div>
                          )}
                          {property.baths > 0 && (
                            <div className="flex items-center gap-1">
                              <Bath className="w-4 h-4 text-muted-foreground" />
                              <span>{property.baths}</span>
                            </div>
                          )}
                          <div className="flex items-center gap-1">
                            <Ruler className="w-4 h-4 text-muted-foreground" />
                            <span>{property.area}m²</span>
                          </div>
                        </div>

                        {/* Agent and Price */}
                        <div className="flex items-center justify-between mb-3">
                          <div className="text-sm">
                            <p className="text-muted-foreground">Agent</p>
                            <p className="font-medium">{property.agent}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-2xl font-bold text-blue-600">
                              {(property.price / 1000).toFixed(0)}k€
                            </p>
                          </div>
                        </div>

                        {/* Contact button */}
                        <Button className="w-full" variant="outline" size="sm">
                          <Phone className="w-4 h-4 mr-2" />
                          Contacter l'agent
                        </Button>
                      </div>
                    </a>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Home className="w-12 h-12 mx-auto text-muted-foreground mb-4 opacity-50" />
                <p className="text-lg text-muted-foreground">
                  Aucun bien ne correspond à vos critères
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
