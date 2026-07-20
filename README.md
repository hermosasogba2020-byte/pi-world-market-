# Pi World Market 🌍

> Écosystème numérique mondial pour Pi Network - Intégration marketplace, e-learning, emplois, voyages, immobilier, véhicules, investissements, dropshipping, messagerie et services géolocalisés.

## 🚀 Stack Technologique

- **Frontend**: React 19 + Vite + TypeScript
- **Backend**: Express + tRPC + TypeScript
- **Database**: MySQL + Drizzle ORM
- **Styling**: Tailwind CSS v4
- **Type Safety**: Full TypeScript end-to-end

## 📁 Structure du Projet

```
pi-world-market/
├── client/              # Frontend React application
│   ├── src/
│   │   ├── components/  # Composants React réutilisables
│   │   ├── pages/       # Pages principales
│   │   ├── hooks/       # React hooks personnalisés
│   │   ├── utils/       # Utilitaires frontend
│   │   └── main.tsx     # Point d'entrée
│   └── index.html
├── server/              # Backend Express + tRPC
│   ├── _core/           # Point d'entrée serveur
│   ├── routes/          # Routeurs tRPC
│   ├── services/        # Logique métier
│   ├── middleware/      # Middlewares Express
│   └── db/              # Connexion base de données
├── shared/              # Code partagé client/server
│   ├── types/           # Types TypeScript partagés
│   └── utils/           # Utilitaires partagés
├── drizzle/             # Migrations et schéma BD
├── package.json         # Dépendances du projet
├── tsconfig.json        # Configuration TypeScript
├── vite.config.ts       # Configuration Vite
└── .gitignore
```

## 🛠️ Installation & Setup

### Prérequis
- Node.js 18+
- npm ou yarn
- MySQL 8+

### Installation

```bash
# Installer les dépendances
npm install

# Configurer les variables d'environnement
cp .env.example .env
# Éditer .env avec vos variables

# Générer les migrations Drizzle
npm run db:generate

# Appliquer les migrations
npm run db:migrate
```

## 📝 Scripts Disponibles

```bash
# Développement
npm run dev                 # Lance le serveur en mode watch

# Construction
npm run build              # Build frontend + type check
npm run preview            # Prévisualisation production

# Tests
npm run test               # Exécute les tests
npm run test:ui            # Interface de test interactive

# Base de données
npm run db:generate        # Génère migrations Drizzle
npm run db:migrate         # Applique migrations
npm run db:push            # Pousse schéma à MySQL

# Qualité du code
npm run lint               # Lint TypeScript/TSX
npm run type-check         # Vérification des types
```

## 🏗️ Architecture

### Frontend (React + Vite)
- Application React complète compilée avec Vite
- Alias `@/` pointant vers `client/src/`
- CSS Tailwind intégré
- Proxy API vers le backend sur `/api`

### Backend (Express + tRPC)
- Serveur Express avec routeur tRPC
- Point d'entrée: `server/_core/index.ts`
- tRPC pour RPC type-safe côté client
- Intégration MySQL avec Drizzle ORM

### Données Partagées
- Types TypeScript définies dans `shared/types/`
- Utilitaires communs dans `shared/utils/`
- Accessible depuis client ET server

## 🗄️ Base de Données

### Configuration
- ORM: Drizzle ORM
- Base de données: MySQL
- Migrations: Stockées dans `drizzle/`
- Driver: mysql2

### Commandes BD
```bash
npm run db:generate   # Génère nouvelle migration
npm run db:migrate    # Applique migrations locales
npm run db:push       # Synchronise schéma avec MySQL
```

## 🚀 Déploiement

### Build Production
```bash
npm run build
```

Ceci génère:
- Frontend compilé dans `dist/`
- Types TypeScript vérifiés

### Variables d'Environnement
```env
DATABASE_URL=mysql://user:password@localhost:3306/pi_world_market
NODE_ENV=production
```

## 📚 Documentation Additionnelle

- [Drizzle ORM Docs](https://orm.drizzle.team/)
- [tRPC Documentation](https://trpc.io/)
- [Vite Guide](https://vitejs.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [ARCHITECTURE.md](./ARCHITECTURE.md) - Architecture détaillée et patterns

## 👥 Contribution

1. Créer une branche: `git checkout -b feature/your-feature`
2. Committer vos changements: `git commit -m 'Add feature'`
3. Pusher: `git push origin feature/your-feature`
4. Ouvrir une Pull Request

## 📄 Licence

Copyright © 2026 Pi World Market. Tous droits réservés.

---

**Dernière mise à jour**: Juillet 2026
