import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Fuel, Gauge, Calendar, Heart, Phone } from "lucide-react";
import { Link } from "wouter";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Vehicles() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100000]);
  const [sortBy, setSortBy] = useState("newest");

  const vehicleTypes = [
    { id: "car", name: "Voiture", count: 3456 },
    { id: "suv", name: "SUV", count: 2134 },
    { id: "truck", name: "Camion", count: 876 },
    { id: "motorcycle", name: "Moto", count: 654 },
    { id: "van", name: "Fourgon", count: 432 },
  ];

  const mockVehicles = useMemo(() => {
    const vehicles = [
      {
        id: 1,
        name: "BMW X5 2023",
        type: "suv",
        price: 65000,
        year: 2023,
        mileage: 5000,
        fuel: "Essence",
        image: "🚙",
        seller: "Auto Premium",
        phone: "+33 6 12 34 56 78",
        isFavorite: false,
      },
      {
        id: 2,
        name: "Renault Clio 2022",
        type: "car",
        price: 18000,
        year: 2022,
        mileage: 25000,
        fuel: "Essence",
        image: "🚗",
        seller: "AutoShop",
        phone: "+33 6 98 76 54 32",
        isFavorite: false,
      },
      {
        id: 3,
        name: "Mercedes-Benz E-Class 2024",
        type: "car",
        price: 85000,
        year: 2024,
        mileage: 1000,
        fuel: "Diesel",
        image: "🚗",
        seller: "Luxury Motors",
        phone: "+33 6 55 44 33 22",
        isFavorite: false,
      },
      {
        id: 4,
        name: "Harley-Davidson Street 750",
        type: "motorcycle",
        price: 8500,
        year: 2021,
        mileage: 12000,
        fuel: "Essence",
        image: "🏍️",
        seller: "Moto Shop",
        phone: "+33 6 11 22 33 44",
        isFavorite: false,
      },
      {
        id: 5,
        name: "Ford Transit Van 2023",
        type: "van",
        price: 35000,
        year: 2023,
        mileage: 8000,
        fuel: "Diesel",
        image: "🚐",
        seller: "Commercial Vehicles",
        phone: "+33 6 77 88 99 00",
        isFavorite: false,
      },
      {
        id: 6,
        name: "Tesla Model 3 2024",
        type: "car",
        price: 55000,
        year: 2024,
        mileage: 500,
        fuel: "Électrique",
        image: "🚗",
        seller: "EV Motors",
        phone: "+33 6 33 44 55 66",
        isFavorite: false,
      },
    ];

    return vehicles.filter(v => {
      const matchesSearch = v.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesType = !selectedType || v.type === selectedType;
      const matchesPrice = v.price >= priceRange[0] && v.price <= priceRange[1];
      return matchesSearch && matchesType && matchesPrice;
    });
  }, [searchQuery, selectedType, priceRange]);

  return (
    <div className="w-full">
      {/* Header */}
      <section className="section-padding-sm bg-gradient-to-r from-orange-50 to-red-50 border-b border-border">
        <div className="container">
          <h1 className="text-4xl font-bold mb-2">Véhicules</h1>
          <p className="text-lg text-muted-foreground">
            Découvrez {mockVehicles.length} véhicules disponibles
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
                    placeholder="Marque, modèle..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>

              {/* Vehicle Types */}
              <div>
                <h3 className="font-semibold mb-3">Type de véhicule</h3>
                <div className="space-y-2">
                  <button
                    onClick={() => setSelectedType(null)}
                    className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                      selectedType === null
                        ? "bg-orange-100 text-orange-900 font-medium"
                        : "hover:bg-muted"
                    }`}
                  >
                    Tous les véhicules
                  </button>
                  {vehicleTypes.map((type) => (
                    <button
                      key={type.id}
                      onClick={() => setSelectedType(type.id)}
                      className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors flex justify-between items-center ${
                        selectedType === type.id
                          ? "bg-orange-100 text-orange-900 font-medium"
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
                      max="100000"
                      step="5000"
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
                      max="100000"
                      step="5000"
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

          {/* Main content - Vehicles */}
          <div className="lg:col-span-3">
            {/* Sort options */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-muted-foreground">
                {mockVehicles.length} véhicule(s) trouvé(s)
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
                  <DropdownMenuItem onClick={() => setSortBy("year")}>
                    Année
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Vehicles grid */}
            {mockVehicles.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {mockVehicles.map((vehicle) => (
                  <Link key={vehicle.id} href={`/vehicle/${vehicle.id}`}>
                    <a className="group card-hover card overflow-hidden no-underline">
                      {/* Vehicle image */}
                      <div className="aspect-video bg-gradient-to-br from-orange-100 to-red-100 flex items-center justify-center text-6xl group-hover:from-orange-200 group-hover:to-red-200 transition-colors relative">
                        {vehicle.image}
                        <button className="absolute top-2 right-2 p-2 rounded-full bg-background/80 hover:bg-background transition-colors opacity-0 group-hover:opacity-100">
                          <Heart className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Vehicle info */}
                      <div className="p-4">
                        <h3 className="font-semibold line-clamp-2 mb-2">
                          {vehicle.name}
                        </h3>

                        {/* Details */}
                        <div className="grid grid-cols-2 gap-2 text-sm mb-4 pb-4 border-b border-border">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4 text-muted-foreground" />
                            <span>{vehicle.year}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Gauge className="w-4 h-4 text-muted-foreground" />
                            <span>{vehicle.mileage.toLocaleString()}km</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Fuel className="w-4 h-4 text-muted-foreground" />
                            <span>{vehicle.fuel}</span>
                          </div>
                        </div>

                        {/* Seller and Price */}
                        <div className="flex items-center justify-between mb-3">
                          <div className="text-sm">
                            <p className="text-muted-foreground">Vendeur</p>
                            <p className="font-medium">{vehicle.seller}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-2xl font-bold text-orange-600">
                              {(vehicle.price / 1000).toFixed(0)}k€
                            </p>
                          </div>
                        </div>

                        {/* Contact button */}
                        <Button className="w-full" variant="outline" size="sm">
                          <Phone className="w-4 h-4 mr-2" />
                          Contacter le vendeur
                        </Button>
                      </div>
                    </a>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-lg text-muted-foreground">
                  Aucun véhicule ne correspond à vos critères
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
