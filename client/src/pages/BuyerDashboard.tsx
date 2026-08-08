import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ShoppingBag, Heart, MessageSquare, Settings, LogOut, Package, Star, TrendingUp } from "lucide-react";
import { useState } from "react";

export default function BuyerDashboard() {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");

  const mockOrders = [
    { id: 1, product: "Laptop Premium", price: 500, status: "Livré", date: "2024-06-20", seller: "TechShop" },
    { id: 2, product: "Souris Wireless", price: 25, status: "En cours", date: "2024-06-22", seller: "ElectroStore" },
    { id: 3, product: "Clavier Mécanique", price: 120, status: "En attente", date: "2024-06-22", seller: "GearHub" },
  ];

  const mockFavorites = [
    { id: 1, name: "Écran 4K", price: 350, seller: "TechShop", rating: 4.8 },
    { id: 2, name: "Webcam HD", price: 80, seller: "ElectroStore", rating: 4.5 },
    { id: 3, name: "Microphone Pro", price: 150, seller: "AudioGear", rating: 4.9 },
  ];

  const stats = [
    { label: "Commandes", value: "12", icon: ShoppingBag },
    { label: "Favoris", value: "8", icon: Heart },
    { label: "Messages", value: "5", icon: MessageSquare },
    { label: "Dépensé", value: "2,450 Pi", icon: TrendingUp },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Tableau de Bord Acheteur</h1>
            <p className="text-muted-foreground">Bienvenue, {user?.name || "Utilisateur"}</p>
          </div>
          <div className="flex gap-2">
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
                  <Icon className="w-8 h-8 text-accent opacity-50" />
                </div>
              </Card>
            );
          })}
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-6 border-b border-border">
          {["overview", "orders", "favorites", "messages"].map((tab) => (
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
                <div className="space-y-4">
                  {mockOrders.map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                      <div>
                        <p className="font-medium">{order.product}</p>
                        <p className="text-sm text-muted-foreground">{order.seller}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">{order.price} Pi</p>
                        <p className={`text-sm ${
                          order.status === "Livré" ? "text-green-600" : 
                          order.status === "En cours" ? "text-blue-600" : 
                          "text-yellow-600"
                        }`}>
                          {order.status}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            <div>
              <Card className="p-6">
                <h2 className="text-lg font-semibold mb-4">Profil</h2>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Nom</p>
                    <p className="font-medium">{user?.name || "N/A"}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-medium">{user?.email || "N/A"}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Rôle</p>
                    <p className="font-medium capitalize">{user?.role || "Acheteur"}</p>
                  </div>
                  <Button className="w-full" variant="outline">
                    <Settings className="w-4 h-4 mr-2" />
                    Modifier le Profil
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        )}

        {activeTab === "orders" && (
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Toutes les Commandes</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-border">
                  <tr>
                    <th className="text-left py-3 px-4 font-semibold">Produit</th>
                    <th className="text-left py-3 px-4 font-semibold">Vendeur</th>
                    <th className="text-left py-3 px-4 font-semibold">Prix</th>
                    <th className="text-left py-3 px-4 font-semibold">Statut</th>
                    <th className="text-left py-3 px-4 font-semibold">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {mockOrders.map((order) => (
                    <tr key={order.id} className="border-b border-border hover:bg-muted/50">
                      <td className="py-3 px-4">{order.product}</td>
                      <td className="py-3 px-4">{order.seller}</td>
                      <td className="py-3 px-4">{order.price} Pi</td>
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

        {activeTab === "favorites" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockFavorites.map((item) => (
              <Card key={item.id} className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-semibold">{item.name}</h3>
                  <Heart className="w-5 h-5 text-red-500 fill-red-500" />
                </div>
                <p className="text-sm text-muted-foreground mb-4">{item.seller}</p>
                <div className="flex items-center justify-between">
                  <p className="text-lg font-bold">{item.price} Pi</p>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{item.rating}</span>
                  </div>
                </div>
                <Button className="w-full mt-4">Ajouter au Panier</Button>
              </Card>
            ))}
          </div>
        )}

        {activeTab === "messages" && (
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Messages</h2>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="p-4 border border-border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium">Vendeur {i}</p>
                      <p className="text-sm text-muted-foreground">Merci pour votre achat...</p>
                    </div>
                    <span className="text-xs text-muted-foreground">Il y a 2h</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}
      </main>
    </div>
  );
}
