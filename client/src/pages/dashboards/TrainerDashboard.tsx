import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BookOpen, Users, Star, TrendingUp, Settings, LogOut, Plus } from "lucide-react";
import { useState } from "react";

export default function TrainerDashboard() {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");

  const stats = [
    { label: "Cours", value: "8", icon: BookOpen, color: "text-purple-600" },
    { label: "Étudiants", value: "342", icon: Users, color: "text-blue-600" },
    { label: "Évaluation", value: "4.8/5", icon: Star, color: "text-yellow-600" },
    { label: "Revenus", value: "8,450 Pi", icon: TrendingUp, color: "text-green-600" },
  ];

  const courses = [
    { id: 1, name: "React Avancé", students: 145, rating: 4.9, revenue: 2450, status: "Actif" },
    { id: 2, name: "Node.js Complet", students: 98, rating: 4.7, revenue: 1890, status: "Actif" },
    { id: 3, name: "TypeScript Pro", students: 67, rating: 4.8, revenue: 1340, status: "Actif" },
    { id: 4, name: "Web Design", students: 32, rating: 4.6, revenue: 770, status: "Brouillon" },
  ];

  const recentEnrollments = [
    { id: 1, student: "Jean Dupont", course: "React Avancé", date: "2024-06-22", progress: 45 },
    { id: 2, student: "Marie Martin", course: "Node.js Complet", date: "2024-06-21", progress: 78 },
    { id: 3, student: "Pierre Leclerc", course: "TypeScript Pro", date: "2024-06-20", progress: 23 },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Tableau de Bord Formateur</h1>
            <p className="text-muted-foreground">Gérez vos cours et vos étudiants</p>
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
          {["overview", "courses", "students"].map((tab) => (
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
                <h2 className="text-lg font-semibold mb-4">Inscriptions Récentes</h2>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="border-b border-border">
                      <tr>
                        <th className="text-left py-3 px-4 font-semibold">Étudiant</th>
                        <th className="text-left py-3 px-4 font-semibold">Cours</th>
                        <th className="text-left py-3 px-4 font-semibold">Progression</th>
                        <th className="text-left py-3 px-4 font-semibold">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentEnrollments.map((enrollment) => (
                        <tr key={enrollment.id} className="border-b border-border hover:bg-muted/50">
                          <td className="py-3 px-4">{enrollment.student}</td>
                          <td className="py-3 px-4">{enrollment.course}</td>
                          <td className="py-3 px-4">
                            <div className="w-24 bg-muted rounded-full h-2">
                              <div 
                                className="bg-green-500 h-2 rounded-full"
                                style={{ width: `${enrollment.progress}%` }}
                              />
                            </div>
                          </td>
                          <td className="py-3 px-4 text-sm">{enrollment.date}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </div>

            <div>
              <Card className="p-6">
                <h2 className="text-lg font-semibold mb-4">Mes Meilleurs Cours</h2>
                <div className="space-y-3">
                  {courses.slice(0, 3).map((course) => (
                    <div key={course.id} className="p-3 border border-border rounded-lg">
                      <p className="font-medium line-clamp-1">{course.name}</p>
                      <div className="flex justify-between text-sm text-muted-foreground mt-1">
                        <span>{course.students} étudiants</span>
                        <span className="text-yellow-500">⭐ {course.rating}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        )}

        {activeTab === "courses" && (
          <Card className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Mes Cours</h2>
              <Button size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Créer un cours
              </Button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-border">
                  <tr>
                    <th className="text-left py-3 px-4 font-semibold">Nom</th>
                    <th className="text-left py-3 px-4 font-semibold">Étudiants</th>
                    <th className="text-left py-3 px-4 font-semibold">Évaluation</th>
                    <th className="text-left py-3 px-4 font-semibold">Revenus</th>
                    <th className="text-left py-3 px-4 font-semibold">Statut</th>
                  </tr>
                </thead>
                <tbody>
                  {courses.map((course) => (
                    <tr key={course.id} className="border-b border-border hover:bg-muted/50">
                      <td className="py-3 px-4 font-medium">{course.name}</td>
                      <td className="py-3 px-4">{course.students}</td>
                      <td className="py-3 px-4">⭐ {course.rating}</td>
                      <td className="py-3 px-4 font-semibold">{course.revenue} Pi</td>
                      <td className="py-3 px-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          course.status === "Actif" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                        }`}>
                          {course.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        )}

        {activeTab === "students" && (
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Mes Étudiants</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="border border-border rounded-lg p-4">
                  <div className="w-12 h-12 bg-muted rounded-full mb-3" />
                  <h3 className="font-semibold">Étudiant {i}</h3>
                  <p className="text-sm text-muted-foreground mb-3">Inscrit à 2 cours</p>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">Voir</Button>
                    <Button variant="outline" size="sm" className="flex-1">Message</Button>
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
