import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, TrendingUp, Percent, Clock, Heart, Info } from "lucide-react";
import { Link } from "wouter";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Investments() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [minReturn, setMinReturn] = useState(0);
  const [sortBy, setSortBy] = useState("newest");

  const investmentTypes = [
    { id: "stocks", name: "Actions", count: 1245 },
    { id: "bonds", name: "Obligations", count: 892 },
    { id: "realestate", name: "Immobilier", count: 456 },
    { id: "crypto", name: "Crypto-monnaies", count: 234 },
    { id: "startups", name: "Startups", count: 567 },
  ];

  const mockInvestments = useMemo(() => {
    const investments = [
      {
        id: 1,
        name: "Fonds Immobilier Premium",
        type: "realestate",
        minInvestment: 10000,
        expectedReturn: 8.5,
        duration: "5 ans",
        risk: "Moyen",
        image: "🏢",
        manager: "Patrimoine Plus",
        investors: 1234,
        isFavorite: false,
      },
      {
        id: 2,
        name: "Portefeuille Actions Tech",
        type: "stocks",
        minInvestment: 5000,
        expectedReturn: 12.3,
        duration: "3 ans",
        risk: "Élevé",
        image: "📈",
        manager: "TechVest",
        investors: 5678,
        isFavorite: false,
      },
      {
        id: 3,
        name: "Obligations Gouvernementales",
        type: "bonds",
        minInvestment: 1000,
        expectedReturn: 3.2,
        duration: "10 ans",
        risk: "Faible",
        image: "📊",
        manager: "Secure Invest",
        investors: 9876,
        isFavorite: false,
      },
      {
        id: 4,
        name: "Startup Fintech Innovation",
        type: "startups",
        minInvestment: 25000,
        expectedReturn: 25.0,
        duration: "7 ans",
        risk: "Très élevé",
        image: "🚀",
        manager: "Venture Capital Hub",
        investors: 234,
        isFavorite: false,
      },
      {
        id: 5,
        name: "Portefeuille Crypto Diversifié",
        type: "crypto",
        minInvestment: 500,
        expectedReturn: 18.5,
        duration: "2 ans",
        risk: "Très élevé",
        image: "₿",
        manager: "Crypto Traders",
        investors: 3456,
        isFavorite: false,
      },
      {
        id: 6,
        name: "Fonds Immobilier Résidentiel",
        type: "realestate",
        minInvestment: 15000,
        expectedReturn: 7.2,
        duration: "5 ans",
        risk: "Moyen",
        image: "🏠",
        manager: "Real Estate Invest",
        investors: 2345,
        isFavorite: false,
      },
    ];

    return investments.filter(inv => {
      const matchesSearch = inv.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesType = !selectedType || inv.type === selectedType;
      const matchesReturn = inv.expectedReturn >= minReturn;
      return matchesSearch && matchesType && matchesReturn;
    });
  }, [searchQuery, selectedType, minReturn]);

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "Faible":
        return "text-green-600 bg-green-50";
      case "Moyen":
        return "text-yellow-600 bg-yellow-50";
      case "Élevé":
        return "text-orange-600 bg-orange-50";
      case "Très élevé":
        return "text-red-600 bg-red-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  return (
    <div className="w-full">
      {/* Header */}
      <section className="section-padding-sm bg-gradient-to-r from-green-50 to-emerald-50 border-b border-border">
        <div className="container">
          <h1 className="text-4xl font-bold mb-2">Investissements</h1>
          <p className="text-lg text-muted-foreground">
            Découvrez {mockInvestments.length} opportunités d'investissement
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
                    placeholder="Fonds, actions..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>

              {/* Investment Types */}
              <div>
                <h3 className="font-semibold mb-3">Type d'investissement</h3>
                <div className="space-y-2">
                  <button
                    onClick={() => setSelectedType(null)}
                    className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                      selectedType === null
                        ? "bg-green-100 text-green-900 font-medium"
                        : "hover:bg-muted"
                    }`}
                  >
                    Tous les investissements
                  </button>
                  {investmentTypes.map((type) => (
                    <button
                      key={type.id}
                      onClick={() => setSelectedType(type.id)}
                      className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors flex justify-between items-center ${
                        selectedType === type.id
                          ? "bg-green-100 text-green-900 font-medium"
                          : "hover:bg-muted"
                      }`}
                    >
                      <span>{type.name}</span>
                      <span className="text-xs opacity-70">({type.count})</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Minimum Return */}
              <div>
                <h3 className="font-semibold mb-3">Rendement Minimum</h3>
                <div className="space-y-3">
                  <div>
                    <label className="text-sm text-muted-foreground">
                      {minReturn.toFixed(1)}% par an
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="30"
                      step="0.5"
                      value={minReturn}
                      onChange={(e) => setMinReturn(Number(e.target.value))}
                      className="w-full"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main content - Investments */}
          <div className="lg:col-span-3">
            {/* Sort options */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-muted-foreground">
                {mockInvestments.length} opportunité(s) trouvée(s)
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
                  <DropdownMenuItem onClick={() => setSortBy("return-high")}>
                    Rendement: haut à bas
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortBy("return-low")}>
                    Rendement: bas à haut
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortBy("risk")}>
                    Risque
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Investments grid */}
            {mockInvestments.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {mockInvestments.map((investment) => (
                  <Link key={investment.id} href={`/investment/${investment.id}`}>
                    <a className="group card-hover card overflow-hidden no-underline">
                      {/* Investment header */}
                      <div className="aspect-video bg-gradient-to-br from-green-100 to-emerald-100 flex items-center justify-center text-6xl group-hover:from-green-200 group-hover:to-emerald-200 transition-colors relative">
                        {investment.image}
                        <button className="absolute top-2 right-2 p-2 rounded-full bg-background/80 hover:bg-background transition-colors opacity-0 group-hover:opacity-100">
                          <Heart className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Investment info */}
                      <div className="p-4">
                        <h3 className="font-semibold line-clamp-2 mb-2">
                          {investment.name}
                        </h3>

                        {/* Manager */}
                        <p className="text-sm text-muted-foreground mb-3">
                          Géré par {investment.manager}
                        </p>

                        {/* Key metrics */}
                        <div className="grid grid-cols-2 gap-2 mb-4 pb-4 border-b border-border">
                          <div className="flex items-center gap-2">
                            <Percent className="w-4 h-4 text-green-600" />
                            <div>
                              <p className="text-xs text-muted-foreground">Rendement</p>
                              <p className="font-semibold text-green-600">
                                {investment.expectedReturn}%
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-blue-600" />
                            <div>
                              <p className="text-xs text-muted-foreground">Durée</p>
                              <p className="font-semibold text-blue-600">
                                {investment.duration}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Risk and Investment */}
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <p className="text-xs text-muted-foreground">Risque</p>
                            <p className={`font-semibold text-sm ${getRiskColor(investment.risk)}`}>
                              {investment.risk}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-xs text-muted-foreground">Investissement min.</p>
                            <p className="text-lg font-bold text-green-600">
                              {(investment.minInvestment / 1000).toFixed(0)}k€
                            </p>
                          </div>
                        </div>

                        {/* Investors count */}
                        <div className="flex items-center gap-1 text-xs text-muted-foreground mb-3">
                          <Info className="w-3 h-3" />
                          {investment.investors.toLocaleString()} investisseurs
                        </div>

                        {/* Invest button */}
                        <Button className="w-full" size="sm">
                          <TrendingUp className="w-4 h-4 mr-2" />
                          Investir maintenant
                        </Button>
                      </div>
                    </a>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <TrendingUp className="w-12 h-12 mx-auto text-muted-foreground mb-4 opacity-50" />
                <p className="text-lg text-muted-foreground">
                  Aucun investissement ne correspond à vos critères
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
