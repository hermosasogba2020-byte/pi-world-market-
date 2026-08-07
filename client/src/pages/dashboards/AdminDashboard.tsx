import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { Users, ShoppingCart, AlertCircle, TrendingUp, Settings, LogOut, Trash2, Edit, Eye } from "lucide-react";
import { useState } from "react";

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");

  const chartData = [
    { name: "Utilisateurs", value: 1245 },
    { name: "Vendeurs", value: 342 },
    { name: "Acheteurs", value: 903 },
  ];

  const COLORS = ["#3b82f6", "#10b981", "#f59e0b"];

  const stats = [
    { label: "Utilisateurs Totaux", value: "2,450", icon: Users, color: "text-blue-600" },
    { label: "Commandes", value: "5,234", icon: ShoppingCart, color: "text-green-600" },
    { label: "Revenus", value: "125,450 Pi", icon: TrendingUp, color: "text-orange-600" },
    { label: "Alertes", value: "12", icon: AlertCircle, color: "text-red-600" },
  ];

  const recentUsers = [
    { id: 1, name: "Jean Dupont", email: "jean@example.com", role: "Vendeur", status: "Actif", joinDate: "2024-06-20" },
    { id: 2, name: "Marie Martin", email: "marie@example.com", role: "Acheteur", status: "Actif", joinDate: "2024-06-21" },
    { id: 3, name: "Pierre Leclerc", email: "pierre@example.com", role: "Vendeur", status: "Inactif", joinDate: "2024-06-15" },
    { id: 4, name: "Sophie Bernard", email: "sophie@example.com", role: "Trainer", status: "Actif", joinDate: "2024-06-22" },
  ];

  const recentTransactions = [
    { id: 1, user: "Jean Dupont", amount: 899, type: "Vente", status: "Complétée", date: "2024-06-22" },
    { id: 2, user: "Marie Martin", amount: 450, type: "Achat", status: "Complétée", date: "2024-06-22" },
    { id: 3, user: "Pierre Leclerc", amount: 1200, type: "Vente", status: "En attente", date: "2024-06-21" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Tableau de Bord Admin</h1>
            <p className="text-muted-foreground">Gestion complète de la plateforme</p>
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
          {["overview", "users", "transactions", "analytics"].map((tab) => (
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
                <h2 className="text-lg font-semibold mb-4">Utilisateurs Récents</h2>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="border-b border-border">
                      <tr>
                        <th className="text-left py-3 px-4 font-semibold">Nom</th>
                        <th className="text-left py-3 px-4 font-semibold">Email</th>
                        <th className="text-left py-3 px-4 font-semibold">Rôle</th>
                        <th className="text-left py-3 px-4 font-semibold">Statut</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentUsers.map((user) => (
                        <tr key={user.id} className="border-b border-border hover:bg-muted/50">
                          <td className="py-3 px-4">{user.name}</td>
                          <td className="py-3 px-4 text-sm">{user.email}</td>
                          <td className="py-3 px-4">{user.role}</td>
                          <td className="py-3 px-4">
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                              user.status === "Actif" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                            }`}>
                              {user.status}
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
                <h2 className="text-lg font-semibold mb-4">Distribution Utilisateurs</h2>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={chartData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value }) => `${name}: ${value}`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </Card>
            </div>
          </div>
        )}

        {activeTab === "users" && (
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Gestion des Utilisateurs</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-border">
                  <tr>
                    <th className="text-left py-3 px-4 font-semibold">Nom</th>
                    <th className="text-left py-3 px-4 font-semibold">Email</th>
                    <th className="text-left py-3 px-4 font-semibold">Rôle</th>
                    <th className="text-left py-3 px-4 font-semibold">Statut</th>
                    <th className="text-left py-3 px-4 font-semibold">Date d'inscription</th>
                    <th className="text-left py-3 px-4 font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {recentUsers.map((user) => (
                    <tr key={user.id} className="border-b border-border hover:bg-muted/50">
                      <td className="py-3 px-4">{user.name}</td>
                      <td className="py-3 px-4 text-sm">{user.email}</td>
                      <td className="py-3 px-4">{user.role}</td>
                      <td className="py-3 px-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          user.status === "Actif" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                        }`}>
                          {user.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-sm">{user.joinDate}</td>
                      <td className="py-3 px-4">
                        <div className="flex gap-2">
                          <button className="p-1 hover:bg-muted rounded">
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="p-1 hover:bg-muted rounded">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button className="p-1 hover:bg-red-100 rounded">
                            <Trash2 className="w-4 h-4 text-red-600" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        )}

        {activeTab === "transactions" && (
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Transactions Récentes</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-border">
                  <tr>
                    <th className="text-left py-3 px-4 font-semibold">ID</th>
                    <th className="text-left py-3 px-4 font-semibold">Utilisateur</th>
                    <th className="text-left py-3 px-4 font-semibold">Montant</th>
                    <th className="text-left py-3 px-4 font-semibold">Type</th>
                    <th className="text-left py-3 px-4 font-semibold">Statut</th>
                    <th className="text-left py-3 px-4 font-semibold">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {recentTransactions.map((tx) => (
                    <tr key={tx.id} className="border-b border-border hover:bg-muted/50">
                      <td className="py-3 px-4">#{tx.id}</td>
                      <td className="py-3 px-4">{tx.user}</td>
                      <td className="py-3 px-4 font-semibold">{tx.amount} Pi</td>
                      <td className="py-3 px-4">{tx.type}</td>
                      <td className="py-3 px-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          tx.status === "Complétée" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                        }`}>
                          {tx.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-sm">{tx.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        )}

        {activeTab === "analytics" && (
          <div className="grid grid-cols-1 gap-6">
            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-4">Croissance des Utilisateurs</h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={[
                  { month: "Jan", users: 400 },
                  { month: "Fév", users: 600 },
                  { month: "Mar", users: 800 },
                  { month: "Avr", users: 1200 },
                  { month: "Mai", users: 1800 },
                  { month: "Juin", users: 2450 },
                ]}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="users" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
}
