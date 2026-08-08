import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Briefcase, Users, CheckCircle, TrendingUp, Settings, LogOut, Plus } from "lucide-react";
import { useState } from "react";

export default function RecruiterDashboard() {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");

  const stats = [
    { label: "Offres", value: "24", icon: Briefcase, color: "text-blue-600" },
    { label: "Candidatures", value: "287", icon: Users, color: "text-green-600" },
    { label: "Embauches", value: "12", icon: CheckCircle, color: "text-purple-600" },
    { label: "Croissance", value: "+45%", icon: TrendingUp, color: "text-orange-600" },
  ];

  const jobs = [
    { id: 1, title: "Développeur React Senior", applications: 34, status: "Actif", posted: "2024-06-10" },
    { id: 2, title: "Designer UX/UI", applications: 28, status: "Actif", posted: "2024-06-15" },
    { id: 3, title: "Product Manager", applications: 19, status: "Fermé", posted: "2024-05-20" },
    { id: 4, title: "Data Scientist", applications: 41, status: "Actif", posted: "2024-06-01" },
  ];

  const recentApplications = [
    { id: 1, candidate: "Jean Dupont", position: "Développeur React Senior", status: "En cours", date: "2024-06-22" },
    { id: 2, candidate: "Marie Martin", position: "Designer UX/UI", status: "Accepté", date: "2024-06-21" },
    { id: 3, candidate: "Pierre Leclerc", position: "Product Manager", status: "Rejeté", date: "2024-06-20" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Tableau de Bord Recruteur</h1>
            <p className="text-muted-foreground">Gérez vos offres d'emploi et candidatures</p>
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
          {["overview", "jobs", "applications"].map((tab) => (
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
                <h2 className="text-lg font-semibold mb-4">Candidatures Récentes</h2>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="border-b border-border">
                      <tr>
                        <th className="text-left py-3 px-4 font-semibold">Candidat</th>
                        <th className="text-left py-3 px-4 font-semibold">Poste</th>
                        <th className="text-left py-3 px-4 font-semibold">Statut</th>
                        <th className="text-left py-3 px-4 font-semibold">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentApplications.map((app) => (
                        <tr key={app.id} className="border-b border-border hover:bg-muted/50">
                          <td className="py-3 px-4">{app.candidate}</td>
                          <td className="py-3 px-4">{app.position}</td>
                          <td className="py-3 px-4">
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                              app.status === "Accepté" ? "bg-green-100 text-green-800" : 
                              app.status === "En cours" ? "bg-blue-100 text-blue-800" : 
                              "bg-red-100 text-red-800"
                            }`}>
                              {app.status}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-sm">{app.date}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </div>

            <div>
              <Card className="p-6">
                <h2 className="text-lg font-semibold mb-4">Offres Actives</h2>
                <div className="space-y-3">
                  {jobs.filter(j => j.status === "Actif").map((job) => (
                    <div key={job.id} className="p-3 border border-border rounded-lg">
                      <p className="font-medium line-clamp-1">{job.title}</p>
                      <div className="flex justify-between text-sm text-muted-foreground mt-1">
                        <span>{job.applications} candidatures</span>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        )}

        {activeTab === "jobs" && (
          <Card className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Mes Offres d'Emploi</h2>
              <Button size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Créer une offre
              </Button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-border">
                  <tr>
                    <th className="text-left py-3 px-4 font-semibold">Titre</th>
                    <th className="text-left py-3 px-4 font-semibold">Candidatures</th>
                    <th className="text-left py-3 px-4 font-semibold">Statut</th>
                    <th className="text-left py-3 px-4 font-semibold">Publié</th>
                  </tr>
                </thead>
                <tbody>
                  {jobs.map((job) => (
                    <tr key={job.id} className="border-b border-border hover:bg-muted/50">
                      <td className="py-3 px-4 font-medium">{job.title}</td>
                      <td className="py-3 px-4">{job.applications}</td>
                      <td className="py-3 px-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          job.status === "Actif" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                        }`}>
                          {job.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-sm">{job.posted}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        )}

        {activeTab === "applications" && (
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Toutes les Candidatures</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="border border-border rounded-lg p-4">
                  <div className="w-12 h-12 bg-muted rounded-full mb-3" />
                  <h3 className="font-semibold">Candidat {i}</h3>
                  <p className="text-sm text-muted-foreground mb-3">Poste: Développeur</p>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">Voir CV</Button>
                    <Button variant="outline" size="sm" className="flex-1">Entretien</Button>
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
