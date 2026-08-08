import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { getLoginUrl } from "@/const";
import { Link } from "wouter";
import { ArrowRight, ShoppingBag, BookOpen, Briefcase, Plane, Users, Globe, Zap, Shield } from "lucide-react";

export default function Home() {
  const { isAuthenticated } = useAuth();

  const services = [
    {
      icon: ShoppingBag,
      title: "Marketplace",
      description: "Achetez et vendez des produits de qualité dans un écosystème sécurisé et transparent.",
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: BookOpen,
      title: "Formation",
      description: "Accédez à des cours de qualité et développez vos compétences avec des experts.",
      color: "from-purple-500 to-purple-600",
    },
    {
      icon: Briefcase,
      title: "Emploi & Freelance",
      description: "Trouvez l'opportunité professionnelle qui vous correspond ou recruter les meilleurs talents.",
      color: "from-green-500 to-green-600",
    },
    {
      icon: Plane,
      title: "Voyages & Transport",
      description: "Planifiez vos voyages et organisez vos déplacements en toute confiance.",
      color: "from-orange-500 to-orange-600",
    },
  ];

  const features = [
    {
      icon: Users,
      title: "Communauté Mondiale",
      description: "Connectez-vous avec des millions d'utilisateurs à travers le monde.",
    },
    {
      icon: Shield,
      title: "Sécurité Garantie",
      description: "Vos données et transactions sont protégées par les meilleures normes de sécurité.",
    },
    {
      icon: Zap,
      title: "Performance",
      description: "Une plateforme rapide et réactive pour une expérience utilisateur optimale.",
    },
    {
      icon: Globe,
      title: "Sans Frontières",
      description: "Accédez à tous les services depuis n'importe où dans le monde.",
    },
  ];

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative overflow-hidden section-padding">
        {/* Background gradient */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
        </div>

        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Left content */}
            <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-4">
                <div className="inline-flex items-center gap-2 w-fit">
                  <span className="px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-medium">
                    🚀 Nouveau
                  </span>
                </div>
                <h1 className="text-5xl md:text-6xl font-bold text-balance">
                  L'écosystème numérique mondial
                </h1>
                <p className="text-xl text-muted-foreground text-balance">
                  Commercez, apprenez, collaborez et voyagez dans un seul environnement intégré et sécurisé.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                {isAuthenticated ? (
                  <>
                    <Link href="/dashboard">
                      <Button size="lg" className="gap-2">
                        Accéder au tableau de bord
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    </Link>
                    <Link href="/marketplace">
                      <Button size="lg" variant="outline">
                        Explorer la marketplace
                      </Button>
                    </Link>
                  </>
                ) : (
                  <>
                    <Button size="lg" asChild className="gap-2">
                      <a href={getLoginUrl()}>
                        Commencer maintenant
                        <ArrowRight className="w-4 h-4" />
                      </a>
                    </Button>
                    <Button size="lg" variant="outline">
                      En savoir plus
                    </Button>
                  </>
                )}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 pt-8 border-t border-border">
                <div>
                  <div className="text-2xl font-bold">1M+</div>
                  <div className="text-sm text-muted-foreground">Utilisateurs</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">50K+</div>
                  <div className="text-sm text-muted-foreground">Produits</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">100+</div>
                  <div className="text-sm text-muted-foreground">Pays</div>
                </div>
              </div>
            </div>

            {/* Right visual */}
            <div className="relative h-96 md:h-full min-h-96">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-accent/5 rounded-2xl" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-4">🌍</div>
                  <p className="text-lg font-semibold">Pi World Market</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="section-padding bg-muted/30">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Nos Services</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Découvrez comment Pi World Market transforme votre expérience numérique.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <Link key={service.title} href={
                  service.title === "Marketplace" ? "/marketplace" :
                  service.title === "Formation" ? "/courses" :
                  service.title === "Emploi & Freelance" ? "/jobs" :
                  "/travels"
                }>
                  <a className="group card-hover p-6 no-underline">
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${service.color} flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{service.title}</h3>
                    <p className="text-sm text-muted-foreground">{service.description}</p>
                  </a>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-padding">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Pourquoi choisir Pi World Market ?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Une plateforme conçue pour vous offrir la meilleure expérience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div key={feature.title} className="card p-8">
                  <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center text-accent mb-4">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-br from-accent to-accent/80 text-accent-foreground">
        <div className="container text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Prêt à rejoindre la révolution ?</h2>
          <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Rejoignez des millions d'utilisateurs qui transforment leur vie numérique avec Pi World Market.
          </p>
          <Button size="lg" variant="secondary" asChild className="gap-2">
            <a href={getLoginUrl()}>
              Commencer maintenant
              <ArrowRight className="w-4 h-4" />
            </a>
          </Button>
        </div>
      </section>
    </div>
  );
}
