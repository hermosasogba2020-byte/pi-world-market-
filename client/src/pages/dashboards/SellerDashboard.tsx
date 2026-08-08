import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from "recharts";
import { TrendingUp, Package, ShoppingCart, DollarSign, Settings, LogOut, Plus, Edit } from "lucide-react";
import { useState } from "react";

export default function SellerDashboard() {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");

  const chartData = [
    { month: "Jan", sales: 4000, revenue: 2400 },
    { month: "Fév", sales: 3000, revenue: 1398 },
    { month: "Mar", sales: 2000, revenue: 9800 },
    { month: "Avr", sales: 2780, revenue: 3908 },
    { month: "Mai", sales: 1890, revenue: 4800 },
    { month: "Juin", sales: 2390, revenue: 3800 },
  ];

  const stats = [
    { label: "Produits", value: "42", icon: Package, color: "text-blue-600" },
    { label: "Commandes", value: "156", icon: ShoppingCart, color: "text-green-600" },
    { label: "Revenus", value: "12,450 Pi", icon: DollarSign, color: "text-orange-600" },
    { label: "Croissance", value: "+23%", icon: TrendingUp, color: "text-purple-600" },
  ];

  const recentOrders = [
    { id: 1, product: "Laptop Premium", buyer: "Jean Dupont", price: 899, status: "Livré", date: "2024-06-20" },
    { id: 2, product: "Souris Wireless", buyer: "Marie Martin", price: 45, status: "En cours", date: "2024-06-22" },
    { id: 3, product: "Clavier Mécanique", buyer: "Pierre Leclerc", price: 120, status: "En attente", date: "2024-06-22" },
  ];

  const topProducts = [
    { id: 1, name: "Laptop Premium", sales: 45, revenue: 40455 },
    { id: 2, name: "Souris Wireless", sales: 128, revenue: 5760 },
    { id: 3, name: "Clavier Mécanique", sales: 67, revenue: 8040 },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Tableau de Bord Vendeur</h1>
            <p className="text-muted-foreground">Gérez votre boutique et vos produits</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Settings className="w-4 h-4 mr-2" />
              Paramètres
            </Button>
            <Button variant="outline" size="sm" onClick={logout}>
              <LogOut className="w-4 h-4 mr-2" />
              Déconnexion
            </Button>
          </div>
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
        <div className="flex gap-4 mb-6 border-b border-border">
          {["overview", "products", "orders", "analytics"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-4 px-2 font-medium transition-colors ${
                activeTab === tab
                  ? "text-accent border-b-2 border-accent"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Content */}
        {activeTab === "overview" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card className="p-6">
                <h2 className="text-lg font-semibold mb-4">Commandes Récentes</h2>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="border-b border-border">
                      <tr>
                        <th className="text-left py-3 px-4 font-semibold">Produit</th>
                        <th className="text-left py-3 px-4 font-semibold">Acheteur</th>
                        <th className="text-left py-3 px-4 font-semibold">Prix</th>
                        <th className="text-left py-3 px-4 font-semibold">Statut</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentOrders.map((order) => (
                        <tr key={order.id} className="border-b border-border hover:bg-muted/50">
                          <td className="py-3 px-4">{order.product}</td>
                          <td className="py-3 px-4">{order.buyer}</td>
                          <td className="py-3 px-4 font-semibold">{order.price} Pi</td>
                          <td className="py-3 px-4">
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                              order.status === "Livré" ? "bg-green-100 text-green-800" : 
                              order.status === "En cours" ? "bg-blue-100 text-blue-800" : 
                              "bg-yellow-100 text-yellow-800"
                            }`}>
                              {order.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </div>

            <div>
              <Card className="p-6">
                <h2 className="text-lg font-semibold mb-4">Produits Top</h2>
                <div className="space-y-4">
                  {topProducts.map((product) => (
                    <div key={product.id} className="p-3 border border-border rounded-lg">
                      <p className="font-medium line-clamp-1">{product.name}</p>
                      <div className="flex justify-between text-sm text-muted-foreground mt-1">
                        <span>{product.sales} ventes</span>
                        <span className="font-semibold text-accent">{product.revenue} Pi</span>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        )}

        {activeTab === "products" && (
          <Card className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Mes Produits</h2>
              <Button size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Ajouter un produit
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="border border-border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="aspect-square bg-muted rounded-lg mb-3 flex items-center justify-center text-3xl">
                    📦
                  </div>
                  <h3 className="font-semibold line-clamp-2">Produit {i}</h3>
                  <p className="text-sm text-muted-foreground mt-1">Prix: 99 Pi</p>
                  <div className="flex gap-2 mt-3">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Edit className="w-3 h-3" />
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">Supprimer</Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}

        {activeTab === "orders" && (
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Toutes les Commandes</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-border">
                  <tr>
                    <th className="text-left py-3 px-4 font-semibold">ID</th>
                    <th className="text-left py-3 px-4 font-semibold">Produit</th>
                    <th className="text-left py-3 px-4 font-semibold">Acheteur</th>
                    <th className="text-left py-3 px-4 font-semibold">Prix</th>
                    <th className="text-left py-3 px-4 font-semibold">Statut</th>
                    <th className="text-left py-3 px-4 font-semibold">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order) => (
                    <tr key={order.id} className="border-b border-border hover:bg-muted/50">
                      <td className="py-3 px-4">#{order.id}</td>
                      <td className="py-3 px-4">{order.product}</td>
                      <td className="py-3 px-4">{order.buyer}</td>
                      <td className="py-3 px-4 font-semibold">{order.price} Pi</td>
                      <td className="py-3 px-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          order.status === "Livré" ? "bg-green-100 text-green-800" : 
                          order.status === "En cours" ? "bg-blue-100 text-blue-800" : 
                          "bg-yellow-100 text-yellow-800"
                        }`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="py-3 px-4">{order.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        )}

        {activeTab === "analytics" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-4">Ventes par Mois</h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="sales" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </Card>

            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-4">Revenus par Mois</h2>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="revenue" stroke="#10b981" />
                </LineChart>
              </ResponsiveContainer>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
}
