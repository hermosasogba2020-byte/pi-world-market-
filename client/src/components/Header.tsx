import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { getLoginUrl } from "@/const";
import { Link } from "wouter";
import { Menu, X, ShoppingBag, BookOpen, Briefcase, Plane, LogOut, Home, Zap, TrendingUp } from "lucide-react";
import { useState } from "react";import Logo from "@/components/Logo";

export default function Header() {
  const { user, logout, isAuthenticated } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur-premium">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
       <Link href="/">
          <a className="flex items-center no-underline hover:opacity-80 transition-opacity">
            <Logo size={32} showWordmark={true} className="hidden sm:flex" />
            <Logo size={32} showWordmark={false} className="flex sm:hidden" />
          </a>
        <Link href="/">
          <a className="flex items-center no-underline hover:opacity-80 transition-opacity">
            <Logo size={32} showWordmark={true} className="hidden sm:flex" />
            <Logo size={32} showWordmark={false} className="flex sm:hidden" />
          </a>
        </Link> 
            <span className="hidden sm:inline">Pi World Market</span>
          </a>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          <Link href="/marketplace">
            <a className="flex items-center gap-1 px-3 py-2 rounded-md text-sm font-medium hover:bg-muted transition-colors no-underline text-foreground">
              <ShoppingBag className="w-4 h-4" />
              Marketplace
            </a>
          </Link>
          <Link href="/courses">
            <a className="flex items-center gap-1 px-3 py-2 rounded-md text-sm font-medium hover:bg-muted transition-colors no-underline text-foreground">
              <BookOpen className="w-4 h-4" />
              Formation
            </a>
          </Link>
          <Link href="/jobs">
            <a className="flex items-center gap-1 px-3 py-2 rounded-md text-sm font-medium hover:bg-muted transition-colors no-underline text-foreground">
              <Briefcase className="w-4 h-4" />
              Emploi
            </a>
          </Link>
          <Link href="/travels">
            <a className="flex items-center gap-1 px-3 py-2 rounded-md text-sm font-medium hover:bg-muted transition-colors no-underline text-foreground">
              <Plane className="w-4 h-4" />
              Voyages
            </a>
          </Link>
          <Link href="/realestate">
            <a className="flex items-center gap-1 px-3 py-2 rounded-md text-sm font-medium hover:bg-muted transition-colors no-underline text-foreground">
              <Home className="w-4 h-4" />
              Immobilier
            </a>
          </Link>
          <Link href="/vehicles">
            <a className="flex items-center gap-1 px-3 py-2 rounded-md text-sm font-medium hover:bg-muted transition-colors no-underline text-foreground">
              <Zap className="w-4 h-4" />
              Véhicules
            </a>
          </Link>
          <Link href="/investments">
            <a className="flex items-center gap-1 px-3 py-2 rounded-md text-sm font-medium hover:bg-muted transition-colors no-underline text-foreground">
              <TrendingUp className="w-4 h-4" />
              Investissements
            </a>
          </Link>
        </nav>

        {/* Right side - Auth buttons */}
        <div className="flex items-center gap-2">
          {isAuthenticated && user ? (
            <div className="flex items-center gap-2">
              <Link href="/dashboard">
                <Button variant="outline" size="sm">
                  Tableau de bord
                </Button>
              </Link>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => logout()}
                className="flex items-center gap-1"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Déconnexion</span>
              </Button>
            </div>
          ) : (
            <Button
              asChild
              size="sm"
            >
              <a href={getLoginUrl()}>Connexion</a>
            </Button>
          )}

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 hover:bg-muted rounded-md transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-card">
          <nav className="container py-4 flex flex-col gap-2">
            <Link href="/marketplace">
              <a className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium hover:bg-muted transition-colors no-underline text-foreground">
                <ShoppingBag className="w-4 h-4" />
                Marketplace
              </a>
            </Link>
            <Link href="/courses">
              <a className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium hover:bg-muted transition-colors no-underline text-foreground">
                <BookOpen className="w-4 h-4" />
                Formation
              </a>
            </Link>
            <Link href="/jobs">
              <a className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium hover:bg-muted transition-colors no-underline text-foreground">
                <Briefcase className="w-4 h-4" />
                Emploi
              </a>
            </Link>
            <Link href="/travels">
              <a className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium hover:bg-muted transition-colors no-underline text-foreground">
                <Plane className="w-4 h-4" />
                Voyages
              </a>
            </Link>
            <Link href="/realestate">
              <a className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium hover:bg-muted transition-colors no-underline text-foreground">
                <Home className="w-4 h-4" />
                Immobilier
              </a>
            </Link>
            <Link href="/vehicles">
              <a className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium hover:bg-muted transition-colors no-underline text-foreground">
                <Zap className="w-4 h-4" />
                Véhicules
              </a>
            </Link>
            <Link href="/investments">
              <a className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium hover:bg-muted transition-colors no-underline text-foreground">
                <TrendingUp className="w-4 h-4" />
                Investissements
              </a>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
