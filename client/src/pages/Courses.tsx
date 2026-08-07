import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Star, Clock, Users, BookOpen, ChevronDown } from "lucide-react";
import { Link } from "wouter";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Courses() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);

  const categories = [
    { id: "development", name: "Développement", count: 342 },
    { id: "design", name: "Design", count: 256 },
    { id: "business", name: "Affaires", count: 189 },
    { id: "marketing", name: "Marketing", count: 234 },
    { id: "languages", name: "Langues", count: 412 },
    { id: "personal", name: "Développement personnel", count: 567 },
  ];

  const levels = [
    { id: "beginner", name: "Débutant" },
    { id: "intermediate", name: "Intermédiaire" },
    { id: "advanced", name: "Avancé" },
  ];

  // Mock courses
  const mockCourses = useMemo(() => {
    const courses = [
      {
        id: 1,
        title: "React Avancé",
        category: "development",
        level: "advanced",
        price: 99,
        rating: 4.9,
        reviews: 1234,
        students: 5432,
        duration: 24,
        thumbnail: "⚛️",
        instructor: "Jean Dupont",
      },
      {
        id: 2,
        title: "Design UI/UX Complet",
        category: "design",
        level: "beginner",
        price: 79,
        rating: 4.7,
        reviews: 892,
        students: 3421,
        duration: 18,
        thumbnail: "🎨",
        instructor: "Marie Martin",
      },
      {
        id: 3,
        title: "Entrepreneuriat 101",
        category: "business",
        level: "beginner",
        price: 49,
        rating: 4.6,
        reviews: 567,
        students: 2134,
        duration: 12,
        thumbnail: "💼",
        instructor: "Pierre Bernard",
      },
      {
        id: 4,
        title: "Marketing Digital",
        category: "marketing",
        level: "intermediate",
        price: 89,
        rating: 4.8,
        reviews: 1456,
        students: 4567,
        duration: 20,
        thumbnail: "📊",
        instructor: "Sophie Laurent",
      },
      {
        id: 5,
        title: "Anglais Professionnel",
        category: "languages",
        level: "intermediate",
        price: 59,
        rating: 4.5,
        reviews: 789,
        students: 2876,
        duration: 16,
        thumbnail: "🇬🇧",
        instructor: "David Miller",
      },
      {
        id: 6,
        title: "Productivité et Gestion du Temps",
        category: "personal",
        level: "beginner",
        price: 39,
        rating: 4.7,
        reviews: 2134,
        students: 6789,
        duration: 8,
        thumbnail: "⏰",
        instructor: "Claire Rousseau",
      },
    ];

    return courses.filter(c => {
      const matchesSearch = c.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = !selectedCategory || c.category === selectedCategory;
      const matchesLevel = !selectedLevel || c.level === selectedLevel;
      return matchesSearch && matchesCategory && matchesLevel;
    });
  }, [searchQuery, selectedCategory, selectedLevel]);

  return (
    <div className="w-full">
      {/* Header */}
      <section className="section-padding-sm bg-muted/30 border-b border-border">
        <div className="container">
          <h1 className="text-4xl font-bold mb-2">Formation en Ligne</h1>
          <p className="text-lg text-muted-foreground">
            Apprenez de nouveaux compétences avec nos {mockCourses.length} cours
          </p>
        </div>
      </section>

      {/* Main content */}
      <div className="container py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar - Filters */}
          <div className="lg:col-span-1">
            <div className="sticky top-20 space-y-6">
              {/* Search */}
              <div>
                <h3 className="font-semibold mb-3">Rechercher</h3>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Rechercher un cours..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>

              {/* Categories */}
              <div>
                <h3 className="font-semibold mb-3">Catégories</h3>
                <div className="space-y-2">
                  <button
                    onClick={() => setSelectedCategory(null)}
                    className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                      selectedCategory === null
                        ? "bg-accent text-accent-foreground font-medium"
                        : "hover:bg-muted"
                    }`}
                  >
                    Tous les cours
                  </button>
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors flex justify-between items-center ${
                        selectedCategory === cat.id
                          ? "bg-accent text-accent-foreground font-medium"
                          : "hover:bg-muted"
                      }`}
                    >
                      <span>{cat.name}</span>
                      <span className="text-xs opacity-70">({cat.count})</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Level */}
              <div>
                <h3 className="font-semibold mb-3">Niveau</h3>
                <div className="space-y-2">
                  <button
                    onClick={() => setSelectedLevel(null)}
                    className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                      selectedLevel === null
                        ? "bg-accent text-accent-foreground font-medium"
                        : "hover:bg-muted"
                    }`}
                  >
                    Tous les niveaux
                  </button>
                  {levels.map((level) => (
                    <button
                      key={level.id}
                      onClick={() => setSelectedLevel(level.id)}
                      className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                        selectedLevel === level.id
                          ? "bg-accent text-accent-foreground font-medium"
                          : "hover:bg-muted"
                      }`}
                    >
                      {level.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price range */}
              <div>
                <h3 className="font-semibold mb-3">Prix</h3>
                <div className="space-y-2">
                  <button className="w-full text-left px-3 py-2 rounded-md text-sm hover:bg-muted transition-colors">
                    Gratuit
                  </button>
                  <button className="w-full text-left px-3 py-2 rounded-md text-sm hover:bg-muted transition-colors">
                    Payant
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Main content - Courses */}
          <div className="lg:col-span-3">
            {/* Sort options */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-muted-foreground">
                {mockCourses.length} cours trouvés
              </p>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="gap-2">
                    Trier par
                    <ChevronDown className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Plus populaire</DropdownMenuItem>
                  <DropdownMenuItem>Meilleure évaluation</DropdownMenuItem>
                  <DropdownMenuItem>Plus récent</DropdownMenuItem>
                  <DropdownMenuItem>Prix: bas à haut</DropdownMenuItem>
                  <DropdownMenuItem>Prix: haut à bas</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Courses grid */}
            {mockCourses.length > 0 ? (
              <div className="space-y-4">
                {mockCourses.map((course) => (
                  <Link key={course.id} href={`/course/${course.id}`}>
                    <a className="group card-hover card p-6 no-underline flex gap-6">
                      {/* Thumbnail */}
                      <div className="w-32 h-32 bg-muted/50 rounded-lg flex items-center justify-center text-4xl flex-shrink-0">
                        {course.thumbnail}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4 mb-2">
                          <div>
                            <h3 className="font-semibold text-lg line-clamp-2">
                              {course.title}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              par {course.instructor}
                            </p>
                          </div>
                          <span className="text-lg font-bold flex-shrink-0">
                            ${course.price}
                          </span>
                        </div>

                        {/* Rating and info */}
                        <div className="flex items-center gap-4 mb-3 text-sm">
                          <div className="flex items-center gap-1">
                            <div className="flex gap-0.5">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-3 h-3 ${
                                    i < Math.floor(course.rating)
                                      ? "fill-yellow-400 text-yellow-400"
                                      : "text-muted-foreground"
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-muted-foreground">
                              ({course.reviews})
                            </span>
                          </div>
                          <div className="flex items-center gap-1 text-muted-foreground">
                            <Users className="w-4 h-4" />
                            {course.students.toLocaleString()} étudiants
                          </div>
                          <div className="flex items-center gap-1 text-muted-foreground">
                            <Clock className="w-4 h-4" />
                            {course.duration}h
                          </div>
                        </div>

                        {/* Level badge */}
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-1 rounded text-xs font-medium bg-accent/10 text-accent">
                            {course.level === "beginner"
                              ? "Débutant"
                              : course.level === "intermediate"
                              ? "Intermédiaire"
                              : "Avancé"}
                          </span>
                        </div>
                      </div>

                      {/* Button */}
                      <div className="flex-shrink-0">
                        <Button variant="outline" className="gap-2">
                          <BookOpen className="w-4 h-4" />
                          S'inscrire
                        </Button>
                      </div>
                    </a>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-lg text-muted-foreground">
                  Aucun cours ne correspond à vos critères
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
