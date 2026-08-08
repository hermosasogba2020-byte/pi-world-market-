import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ShoppingCart, Package, Heart, TrendingUp, Settings, LogOut, Trash2, Download } from "lucide-react";
import { useState } from "react";

export default function BuyerDashboard() {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");

  const stats = [
    { label: "Commandes", value: "18", icon: ShoppingCart, color: "text-blue-600" },
    { label: "Favoris", value: "42", icon: Heart, color: "text-red-600" },
    { label: "Dépensé", value: "3,450 Pi", icon: TrendingUp, color: "text-green-600" },
    { label: "Panier", value: "5 articles", icon: Package, color: "text-orange-600" },
  ];

  const orders = [
    { id: 1, product: "Laptop Premium", seller: "TechStore", price: 899, status: "Livré", date: "2024-06-20" },
    { id: 2, product: "Souris Wireless", seller: "ElectroShop", price: 45, status: "En cours", date: "2024-06-22" },
    { id: 3, product: "Clavier Mécanique", seller: "GearHub", price: 120, status: "En attente", date: "2024-06-22" },
    { id: 4, product: "Écran 4K", seller: "DisplayPro", price: 599, status: "Livré", date: "2024-06-15" },
  ];

  const favorites = [
    { id: 1, name: "Gaming Headset", seller: "AudioZone", price: 199, rating: 4.8 },
    { id: 2, name: "USB-C Hub", seller: "TechGear", price: 89, rating: 4.6 },
    { id: 3, name: "Webcam 1080p", seller: "CameraShop", price: 79, rating: 4.7 },
  ];

  const cart = [
    { id: 1, product: "Monitor Stand", price: 45, quantity: 1 },
    { id: 2, product: "Cable HDMI", price: 15, quantity: 2 },
    { id: 3, product: "Mouse Pad", price: 25, quantity: 1 },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Tableau de Bord Acheteur</h1>
            <p className="text-muted-foreground">Gérez vos commandes et favoris</p>
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
          {["overview", "orders", "favorites", "cart"].map((tab) => (
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
                        <th className="text-left py-3 px-4 font-semibold">Vendeur</th>
                        <th className="text-left py-3 px-4 font-semibold">Prix</th>
                        <th className="text-left py-3 px-4 font-semibold">Statut</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.slice(0, 3).map((order) => (
                        <tr key={order.id} className="border-b border-border hover:bg-muted/50">
                          <td className="py-3 px-4">{order.product}</td>
                          <td className="py-3 px-4">{order.seller}</td>
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
                <h2 className="text-lg font-semibold mb-4">Favoris Récents</h2>
                <div className="space-y-3">
                  {favorites.slice(0, 3).map((fav) => (
                    <div key={fav.id} className="p-3 border border-border rounded-lg">
                      <p className="font-medium line-clamp-1">{fav.name}</p>
                      <div className="flex justify-between text-sm text-muted-foreground mt-1">
                        <span>{fav.price} Pi</span>
                        <span className="text-yellow-500">⭐ {fav.rating}</span>
                      </div>
                    </div>
                  ))}
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
                    <th className="text-left py-3 px-4 font-semibold">ID</th>
                    <th className="text-left py-3 px-4 font-semibold">Produit</th>
                    <th className="text-left py-3 px-4 font-semibold">Vendeur</th>
                    <th className="text-left py-3 px-4 font-semibold">Prix</th>
                    <th className="text-left py-3 px-4 font-semibold">Statut</th>
                    <th className="text-left py-3 px-4 font-semibold">Date</th>
                    <th className="text-left py-3 px-4 font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id} className="border-b border-border hover:bg-muted/50">
                      <td className="py-3 px-4">#{order.id}</td>
                      <td className="py-3 px-4">{order.product}</td>
                      <td className="py-3 px-4">{order.seller}</td>
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
                      <td className="py-3 px-4 text-sm">{order.date}</td>
                      <td className="py-3 px-4">
                        <Button variant="outline" size="sm">Voir</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        )}

        {activeTab === "favorites" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {favorites.map((fav) => (
              <Card key={fav.id} className="p-4">
                <div className="aspect-square bg-muted rounded-lg mb-3 flex items-center justify-center text-3xl">
                  ❤️
                </div>
                <h3 className="font-semibold line-clamp-2">{fav.name}</h3>
                <p className="text-sm text-muted-foreground mt-1">Par {fav.seller}</p>
                <div className="flex justify-between items-center mt-3">
                  <span className="font-semibold">{fav.price} Pi</span>
                  <span className="text-yellow-500">⭐ {fav.rating}</span>
                </div>
                <Button className="w-full mt-3" size="sm">Ajouter au panier</Button>
              </Card>
            ))}
          </div>
        )}

        {activeTab === "cart" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card className="p-6">
                <h2 className="text-lg font-semibold mb-4">Panier ({cart.length} articles)</h2>
                <div className="space-y-3">
                  {cart.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                      <div className="flex-1">
                        <p className="font-medium">{item.product}</p>
                        <p className="text-sm text-muted-foreground">Quantité: {item.quantity}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">{item.price * item.quantity} Pi</p>
                        <button className="text-red-600 hover:text-red-700 mt-1">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            <Card className="p-6 h-fit">
              <h2 className="text-lg font-semibold mb-4">Résumé</h2>
              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span>Sous-total</span>
                  <span className="font-semibold">85 Pi</span>
                </div>
                <div className="flex justify-between">
                  <span>Livraison</span>
                  <span className="font-semibold">10 Pi</span>
                </div>
                <div className="border-t border-border pt-2 mt-2 flex justify-between">
                  <span className="font-semibold">Total</span>
                  <span className="font-bold text-lg">95 Pi</span>
                </div>
              </div>
              <Button className="w-full">Passer la commande</Button>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
}
