import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter, Star, Heart, ShoppingCart, ChevronDown } from "lucide-react";
import { Link } from "wouter";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Marketplace() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [sortBy, setSortBy] = useState("newest");

  const categories = [
    { id: "electronics", name: "Électronique", count: 2543 },
    { id: "fashion", name: "Mode", count: 1892 },
    { id: "home", name: "Maison", count: 1456 },
    { id: "sports", name: "Sports", count: 987 },
    { id: "books", name: "Livres", count: 654 },
    { id: "toys", name: "Jouets", count: 432 },
  ];

  // Mock products for demonstration
  const mockProducts = useMemo(() => {
    const products = [
      {
        id: 1,
        name: "Smartphone Premium",
        category: "electronics",
        price: 899,
        rating: 4.8,
        reviews: 234,
        image: "🎧",
        seller: "TechStore",
        isFavorite: false,
      },
      {
        id: 2,
        name: "Robe Élégante",
        category: "fashion",
        price: 129,
        rating: 4.6,
        reviews: 156,
        image: "👗",
        seller: "FashionHub",
        isFavorite: false,
      },
      {
        id: 3,
        name: "Canapé Confortable",
        category: "home",
        price: 599,
        rating: 4.7,
        reviews: 89,
        image: "🛋️",
        seller: "HomeDecor",
        isFavorite: false,
      },
      {
        id: 4,
        name: "Vélo de Route",
        category: "sports",
        price: 449,
        rating: 4.9,
        reviews: 203,
        image: "🚴",
        seller: "SportGear",
        isFavorite: false,
      },
      {
        id: 5,
        name: "Livre de Science-Fiction",
        category: "books",
        price: 24,
        rating: 4.5,
        reviews: 567,
        image: "📚",
        seller: "BookWorld",
        isFavorite: false,
      },
      {
        id: 6,
        name: "Jeu de Société",
        category: "toys",
        price: 39,
        rating: 4.4,
        reviews: 123,
        image: "🎲",
        seller: "PlayZone",
        isFavorite: false,
      },
    ];

    return products.filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = !selectedCategory || p.category === selectedCategory;
      const matchesPrice = p.price >= priceRange[0] && p.price <= priceRange[1];
      return matchesSearch && matchesCategory && matchesPrice;
    });
  }, [searchQuery, selectedCategory, priceRange]);

  return (
    <div className="w-full">
      {/* Header */}
      <section className="section-padding-sm bg-muted/30 border-b border-border">
        <div className="container">
          <h1 className="text-4xl font-bold mb-2">Marketplace</h1>
          <p className="text-lg text-muted-foreground">
            Découvrez {mockProducts.length} produits de qualité
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
                    placeholder="Rechercher..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>

              {/* Categories */}
              <div>
                <h3 className="font-semibold mb-3">Catégories</h3>
                <div className="space-y-2">
                  <button
                    onClick={() => setSelectedCategory(null)}
                    className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                      selectedCategory === null
                        ? "bg-accent text-accent-foreground font-medium"
                        : "hover:bg-muted"
                    }`}
                  >
                    Tous les produits
                  </button>
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors flex justify-between items-center ${
                        selectedCategory === cat.id
                          ? "bg-accent text-accent-foreground font-medium"
                          : "hover:bg-muted"
                      }`}
                    >
                      <span>{cat.name}</span>
                      <span className="text-xs opacity-70">({cat.count})</span>
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
                      Min: ${priceRange[0]}
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="1000"
                      value={priceRange[0]}
                      onChange={(e) =>
                        setPriceRange([Number(e.target.value), priceRange[1]])
                      }
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground">
                      Max: ${priceRange[1]}
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="1000"
                      value={priceRange[1]}
                      onChange={(e) =>
                        setPriceRange([priceRange[0], Number(e.target.value)])
                      }
                      className="w-full"
                    />
                  </div>
                </div>
              </div>

              {/* Rating filter */}
              <div>
                <h3 className="font-semibold mb-3">Évaluation</h3>
                <div className="space-y-2">
                  {[5, 4, 3, 2, 1].map((rating) => (
                    <button
                      key={rating}
                      className="w-full text-left px-3 py-2 rounded-md text-sm hover:bg-muted transition-colors flex items-center gap-2"
                    >
                      <div className="flex gap-0.5">
                        {[...Array(rating)].map((_, i) => (
                          <Star
                            key={i}
                            className="w-3 h-3 fill-yellow-400 text-yellow-400"
                          />
                        ))}
                      </div>
                      <span className="text-xs text-muted-foreground">& plus</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Main content - Products */}
          <div className="lg:col-span-3">
            {/* Sort and view options */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-muted-foreground">
                {mockProducts.length} produits trouvés
              </p>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Filter className="w-4 h-4" />
                    Trier par
                    <ChevronDown className="w-4 h-4" />
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
                  <DropdownMenuItem onClick={() => setSortBy("rating")}>
                    Meilleure évaluation
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortBy("popular")}>
                    Plus populaire
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Products grid */}
            {mockProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockProducts.map((product) => (
                  <Link key={product.id} href={`/product/${product.id}`}>
                    <a className="group card-hover card overflow-hidden no-underline">
                      {/* Product image */}
                      <div className="aspect-square bg-muted/50 flex items-center justify-center text-6xl group-hover:bg-muted transition-colors relative">
                        {product.image}
                        <button className="absolute top-2 right-2 p-2 rounded-full bg-background/80 hover:bg-background transition-colors opacity-0 group-hover:opacity-100">
                          <Heart className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Product info */}
                      <div className="p-4">
                        <h3 className="font-semibold line-clamp-2 mb-2">
                          {product.name}
                        </h3>

                        {/* Rating */}
                        <div className="flex items-center gap-2 mb-3">
                          <div className="flex gap-0.5">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-3 h-3 ${
                                  i < Math.floor(product.rating)
                                    ? "fill-yellow-400 text-yellow-400"
                                    : "text-muted-foreground"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-xs text-muted-foreground">
                            ({product.reviews})
                          </span>
                        </div>

                        {/* Seller */}
                        <p className="text-xs text-muted-foreground mb-3">
                          {product.seller}
                        </p>

                        {/* Price and button */}
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-lg">${product.price}</span>
                          <Button size="sm" className="gap-1">
                            <ShoppingCart className="w-3 h-3" />
                            <span className="hidden sm:inline">Ajouter</span>
                          </Button>
                        </div>
                      </div>
                    </a>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-lg text-muted-foreground">
                  Aucun produit ne correspond à vos critères
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
