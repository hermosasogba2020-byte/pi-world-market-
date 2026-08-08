import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Briefcase, FileText, CheckCircle, TrendingUp, Settings, LogOut, Download } from "lucide-react";
import { useState } from "react";

export default function CandidateDashboard() {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");

  const stats = [
    { label: "Candidatures", value: "12", icon: Briefcase, color: "text-blue-600" },
    { label: "Entretiens", value: "4", icon: FileText, color: "text-purple-600" },
    { label: "Offres", value: "2", icon: CheckCircle, color: "text-green-600" },
    { label: "Profil", value: "85%", icon: TrendingUp, color: "text-orange-600" },
  ];

  const applications = [
    { id: 1, position: "Développeur React Senior", company: "TechCorp", status: "Entretien", date: "2024-06-22" },
    { id: 2, position: "Full Stack Developer", company: "StartupXYZ", status: "Accepté", date: "2024-06-20" },
    { id: 3, position: "Node.js Developer", company: "CloudSys", status: "En attente", date: "2024-06-18" },
    { id: 4, position: "Frontend Engineer", company: "WebStudio", status: "Rejeté", date: "2024-06-15" },
  ];

  const interviews = [
    { id: 1, company: "TechCorp", position: "Développeur React Senior", date: "2024-06-25", time: "14:00" },
    { id: 2, company: "StartupXYZ", position: "Full Stack Developer", date: "2024-06-27", time: "10:00" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Tableau de Bord Candidat</h1>
            <p className="text-muted-foreground">Suivez vos candidatures et offres</p>
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
          {["overview", "applications", "interviews"].map((tab) => (
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
                        <th className="text-left py-3 px-4 font-semibold">Poste</th>
                        <th className="text-left py-3 px-4 font-semibold">Entreprise</th>
                        <th className="text-left py-3 px-4 font-semibold">Statut</th>
                        <th className="text-left py-3 px-4 font-semibold">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {applications.slice(0, 3).map((app) => (
                        <tr key={app.id} className="border-b border-border hover:bg-muted/50">
                          <td className="py-3 px-4">{app.position}</td>
                          <td className="py-3 px-4">{app.company}</td>
                          <td className="py-3 px-4">
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                              app.status === "Accepté" ? "bg-green-100 text-green-800" : 
                              app.status === "Entretien" ? "bg-blue-100 text-blue-800" : 
                              app.status === "En attente" ? "bg-yellow-100 text-yellow-800" :
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
                <h2 className="text-lg font-semibold mb-4">Prochains Entretiens</h2>
                <div className="space-y-3">
                  {interviews.map((interview) => (
                    <div key={interview.id} className="p-3 border border-border rounded-lg">
                      <p className="font-medium line-clamp-1">{interview.company}</p>
                      <p className="text-xs text-muted-foreground mt-1">{interview.position}</p>
                      <div className="flex justify-between text-sm mt-2">
                        <span>{interview.date}</span>
                        <span className="font-semibold">{interview.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        )}

        {activeTab === "applications" && (
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Toutes les Candidatures</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-border">
                  <tr>
                    <th className="text-left py-3 px-4 font-semibold">Poste</th>
                    <th className="text-left py-3 px-4 font-semibold">Entreprise</th>
                    <th className="text-left py-3 px-4 font-semibold">Statut</th>
                    <th className="text-left py-3 px-4 font-semibold">Date</th>
                    <th className="text-left py-3 px-4 font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {applications.map((app) => (
                    <tr key={app.id} className="border-b border-border hover:bg-muted/50">
                      <td className="py-3 px-4">{app.position}</td>
                      <td className="py-3 px-4">{app.company}</td>
                      <td className="py-3 px-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          app.status === "Accepté" ? "bg-green-100 text-green-800" : 
                          app.status === "Entretien" ? "bg-blue-100 text-blue-800" : 
                          app.status === "En attente" ? "bg-yellow-100 text-yellow-800" :
                          "bg-red-100 text-red-800"
                        }`}>
                          {app.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-sm">{app.date}</td>
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

        {activeTab === "interviews" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {interviews.map((interview) => (
              <Card key={interview.id} className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold">{interview.company}</h3>
                    <p className="text-muted-foreground">{interview.position}</p>
                  </div>
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <div className="space-y-3 mb-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Date</p>
                    <p className="font-semibold">{interview.date}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Heure</p>
                    <p className="font-semibold">{interview.time}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button className="flex-1" size="sm">Accepter</Button>
                  <Button variant="outline" className="flex-1" size="sm">Reprogrammer</Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
