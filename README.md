# Pi World Market

Écosystème numérique mondial : marketplace, e-learning, emploi, voyages, immobilier,
véhicules, investissements, dropshipping, messagerie et services géolocalisés,
réunis dans une seule plateforme.

## Stack technique
- **Frontend** : React 19 + Vite + Tailwind CSS + shadcn/ui
- **Backend** : Express + tRPC
- **Base de données** : MySQL (via Drizzle ORM)
- **Stockage fichiers** : S3 (AWS S3, Cloudflare R2, ou compatible)
- **IA** : API compatible OpenAI (chat, génération d'images)

Ce projet est **entièrement autonome** — aucune dépendance à un service tiers
propriétaire n'est requise pour le faire fonctionner.

## Démarrage local

```bash
pnpm install
cp .env.example .env   # puis remplissez vos variables (voir DEPLOY.md)
pnpm db:push           # crée les tables dans votre base MySQL
pnpm dev
```

L'application démarre sur `http://localhost:3000`.

## Déploiement

Voir [`DEPLOY.md`](./DEPLOY.md) pour un guide pas-à-pas (Railway recommandé,
ou VPS avec Docker).

## Comptes utilisateurs

L'authentification se fait par email/mot de passe (page `/login`). Pour créer un
compte administrateur, voir la section correspondante dans `DEPLOY.md`.
