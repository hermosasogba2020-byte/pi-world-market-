import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Package, TrendingUp, Users, ShoppingCart, Search, Plus } from "lucide-react";
import { useState } from "react";

export default function Dropshipping() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSupplier, setSelectedSupplier] = useState<number | null>(null);

  const suppliers = [
    {
      id: 1,
      name: "TechSupply Co",
      rating: 4.8,
      products: 1250,
      minOrder: 1,
      shippingDays: "3-5",
      commission: "15%",
      logo: "🏭",
    },
    {
      id: 2,
      name: "Fashion Hub",
      rating: 4.6,
      products: 850,
      minOrder: 5,
      shippingDays: "5-7",
      commission: "20%",
      logo: "👗",
    },
    {
      id: 3,
      name: "Electronics Plus",
      rating: 4.9,
      products: 2100,
      minOrder: 1,
      shippingDays: "2-4",
      commission: "12%",
      logo: "📱",
    },
    {
      id: 4,
      name: "Home Goods",
      rating: 4.5,
      products: 650,
      minOrder: 3,
      shippingDays: "4-6",
      commission: "18%",
      logo: "🏠",
    },
  ];

  const myProducts = [
    {
      id: 1,
      name: "Wireless Headphones",
      supplier: "TechSupply Co",
      cost: 25,
      price: 59.99,
      sales: 234,
      profit: 8505,
    },
    {
      id: 2,
      name: "USB-C Cable",
      supplier: "TechSupply Co",
      cost: 2,
      price: 9.99,
      sales: 1200,
      profit: 9588,
    },
    {
      id: 3,
      name: "Phone Case",
      supplier: "Electronics Plus",
      cost: 3,
      price: 12.99,
      sales: 567,
      profit: 6762,
    },
  ];

  const stats = [
    { label: "Fournisseurs", value: "12", icon: Users, color: "text-blue-600" },
    { label: "Produits", value: "45", icon: Package, color: "text-green-600" },
    { label: "Ventes", value: "2,001", icon: ShoppingCart, color: "text-purple-600" },
    { label: "Profit", value: "24,855 Pi", icon: TrendingUp, color: "text-orange-600" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold">Dropshipping</h1>
          <p className="text-muted-foreground">Gérez vos produits en dropshipping</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <Card key={idx} className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <p className="text-2xl font-bold mt-2">{stat.value}</p>
                  </div>
                  <Icon className={`w-8 h-8 ${stat.color} opacity-50`} />
                </div>
              </Card>
            );
          })}
        </div>

        {/* Tabs */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Suppliers */}
          <div className="lg:col-span-2">
            <Card className="p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Fournisseurs</h2>
                <Button size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Ajouter
                </Button>
              </div>

              {/* Search */}
              <div className="relative mb-4">
                <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Rechercher un fournisseur..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Suppliers Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {suppliers.map((supplier) => (
                  <Card
                    key={supplier.id}
                    className={`p-4 cursor-pointer transition-colors ${
                      selectedSupplier === supplier.id
                        ? "border-accent bg-accent/5"
                        : "hover:bg-muted/50"
                    }`}
                    onClick={() => setSelectedSupplier(supplier.id)}
                  >
                    <div className="flex items-start gap-3 mb-3">
                      <span className="text-3xl">{supplier.logo}</span>
                      <div className="flex-1">
                        <p className="font-semibold">{supplier.name}</p>
                        <div className="flex items-center gap-1 text-sm">
                          <span className="text-yellow-500">⭐ {supplier.rating}</span>
                          <span className="text-muted-foreground">
                            ({supplier.products} produits)
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2 text-sm mb-3">
                      <div>
                        <p className="text-muted-foreground">Commande min</p>
                        <p className="font-semibold">{supplier.minOrder}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Livraison</p>
                        <p className="font-semibold">{supplier.shippingDays}j</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Commission</p>
                        <p className="font-semibold">{supplier.commission}</p>
                      </div>
                    </div>

                    <Button className="w-full" size="sm">
                      Voir les produits
                    </Button>
                  </Card>
                ))}
              </div>
            </Card>

            {/* My Products */}
            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-4">Mes Produits</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b border-border">
                    <tr>
                      <th className="text-left py-3 px-4 font-semibold">Produit</th>
                      <th className="text-left py-3 px-4 font-semibold">Fournisseur</th>
                      <th className="text-left py-3 px-4 font-semibold">Coût</th>
                      <th className="text-left py-3 px-4 font-semibold">Prix</th>
                      <th className="text-left py-3 px-4 font-semibold">Ventes</th>
                      <th className="text-left py-3 px-4 font-semibold">Profit</th>
                    </tr>
                  </thead>
                  <tbody>
                    {myProducts.map((product) => (
                      <tr key={product.id} className="border-b border-border hover:bg-muted/50">
                        <td className="py-3 px-4">{product.name}</td>
                        <td className="py-3 px-4 text-sm">{product.supplier}</td>
                        <td className="py-3 px-4">{product.cost} Pi</td>
                        <td className="py-3 px-4 font-semibold">{product.price} Pi</td>
                        <td className="py-3 px-4">{product.sales}</td>
                        <td className="py-3 px-4 font-semibold text-green-600">
                          {product.profit} Pi
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div>
            {selectedSupplier ? (
              <Card className="p-6 sticky top-4">
                <div className="text-center mb-6">
                  <p className="text-4xl mb-2">
                    {suppliers[selectedSupplier - 1]?.logo}
                  </p>
                  <h3 className="text-lg font-semibold">
                    {suppliers[selectedSupplier - 1]?.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    ⭐ {suppliers[selectedSupplier - 1]?.rating}
                  </p>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="p-3 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground">Produits disponibles</p>
                    <p className="font-bold text-lg">
                      {suppliers[selectedSupplier - 1]?.products}
                    </p>
                  </div>
                  <div className="p-3 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground">Commission</p>
                    <p className="font-bold text-lg">
                      {suppliers[selectedSupplier - 1]?.commission}
                    </p>
                  </div>
                  <div className="p-3 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground">Délai de livraison</p>
                    <p className="font-bold text-lg">
                      {suppliers[selectedSupplier - 1]?.shippingDays} jours
                    </p>
                  </div>
                </div>

                <Button className="w-full mb-2">Voir les produits</Button>
                <Button variant="outline" className="w-full">
                  Contacter
                </Button>
              </Card>
            ) : (
              <Card className="p-6 text-center sticky top-4">
                <p className="text-muted-foreground mb-4">
                  Sélectionnez un fournisseur pour voir les détails
                </p>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
