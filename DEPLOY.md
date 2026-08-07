# Guide de déploiement — Pi World Market

Ce projet est maintenant **100% autonome** : plus aucune dépendance à Manus.
Il vous faut 3 choses avant de déployer :

1. Une **base de données MySQL** (Railway, PlanetScale, ou un serveur MySQL classique)
2. Un **espace de stockage S3** (AWS S3, Cloudflare R2 — gratuit jusqu'à 10 Go, ou Backblaze B2)
3. Une **clé API OpenAI** (pour le chat IA et la génération d'images) — optionnel si vous n'utilisez pas ces fonctions

---

## Option recommandée : Railway (le plus simple)

Railway héberge à la fois votre serveur Node.js (Express) et votre base MySQL, sans
avoir à réécrire le backend en fonctions serverless (contrairement à Vercel).

### 1. Créer le projet
1. Allez sur [railway.app](https://railway.app), connectez-vous avec GitHub
2. "New Project" → "Deploy from GitHub repo" → sélectionnez `pi-world-market-`
3. Railway détecte Node.js automatiquement

### 2. Base de données : TiDB Cloud Serverless (gratuit, compatible MySQL)

Le quota gratuit de Railway pour les bases de données étant limité, utilisez TiDB Cloud
(compatible MySQL, tier gratuit généreux : 5 Go de stockage) :

1. Allez sur **tidbcloud.com** → créez un compte gratuit
2. **"Create Cluster"** → choisissez **"Serverless"**
3. Une fois créé, ouvrez le cluster → **"Connect"** → copiez la chaîne de connexion
   (ressemble à `mysql://user.root:password@gateway01.xxx.tidbcloud.com:4000/pi_world_market`)
4. Ajoutez cette valeur à `DATABASE_URL` dans les variables Railway, et ajoutez aussi :
   ```
   DB_SSL=true
   ```
   (TiDB exige une connexion chiffrée — c'est déjà pris en charge par le code)

### 3. Configurer les variables d'environnement
Dans l'onglet "Variables" du service web, ajoutez (voir `.env.example` pour le détail) :
```
NODE_ENV=production
JWT_SECRET=<générez avec: openssl rand -hex 32>
DATABASE_URL=<collée depuis l'étape précédente>
OPENAI_API_KEY=<votre clé>
S3_BUCKET=<votre bucket>
S3_REGION=<région>
S3_ACCESS_KEY_ID=<...>
S3_SECRET_ACCESS_KEY=<...>
GOOGLE_MAPS_API_KEY=<optionnel>
```

### 4. Build & start
Railway lit `package.json` automatiquement :
- Build command : `pnpm build`
- Start command : `pnpm start`

### 5. Initialiser le schéma de la base
Une fois `DATABASE_URL` configurée, exécutez localement (ou via le terminal Railway) :
```bash
pnpm install
pnpm db:push
```
Cela crée toutes les tables (y compris la nouvelle colonne `passwordHash`).

### 6. Domaine
Railway fournit un sous-domaine `*.up.railway.app` gratuit, ou vous pouvez brancher
votre propre nom de domaine dans "Settings" → "Networking" → "Custom Domain".

---

## Option alternative : VPS (OVH, Hostinger, DigitalOcean...) avec Docker

Un `Dockerfile` est déjà inclus à la racine du projet.

```bash
# Sur votre VPS (Ubuntu/Debian), avec Docker installé :
git clone https://github.com/hermosasogba2020-byte/pi-world-market-.git
cd pi-world-market-
cp .env.example .env
nano .env   # remplissez vos vraies valeurs

docker build -t pi-world-market .
docker run -d --name pi-world-market \
  --env-file .env \
  -p 3000:3000 \
  --restart unless-stopped \
  pi-world-market
```

Ajoutez ensuite un reverse-proxy (nginx ou Caddy) devant le port 3000 pour gérer le
HTTPS avec Let's Encrypt. Vous aurez aussi besoin d'un serveur MySQL séparé
(ex: `docker run mysql:8`, ou un service managé).

---

## Concernant Vercel

Le dépôt est actuellement relié à `pi-world-market.vercel.app`, mais ce projet est un
**serveur Express classique avec état** (sessions, WebSocket potentiels), pas une
architecture serverless. Pour du Vercel, il faudrait redécouper `server/routers.ts`
en fonctions serverless individuelles (`/api/*.ts`) — un travail de portage
significatif. Je recommande Railway ou Render pour éviter cette réécriture.
Si vous tenez à Vercel, dites-le-moi et je peux entamer cette conversion séparément.

---

## Récapitulatif des services externes à créer

| Service | Où l'obtenir | Variables concernées |
|---|---|---|
| Base MySQL | Railway / PlanetScale | `DATABASE_URL` |
| Stockage fichiers | AWS S3 ou Cloudflare R2 | `S3_BUCKET`, `S3_REGION`, `S3_ACCESS_KEY_ID`, `S3_SECRET_ACCESS_KEY`, `S3_ENDPOINT` (R2 seulement) |
| IA (chat, images) | platform.openai.com | `OPENAI_API_KEY` |
| Cartes/géoloc | console.cloud.google.com (Maps Platform) | `GOOGLE_MAPS_API_KEY` |

Toutes les autres fonctionnalités (marketplace, jobs, messagerie, etc.) fonctionnent
sans configuration supplémentaire une fois la base de données connectée.

## Créer votre premier compte admin

1. Déployez l'application et ouvrez `/login` → onglet "Créer un compte"
2. Inscrivez-vous normalement (email + mot de passe)
3. Connectez-vous à votre base MySQL et exécutez :
   ```sql
   UPDATE users SET role = 'admin' WHERE email = 'votre@email.com';
   ```
   (ou définissez `OWNER_OPEN_ID` dans les variables d'environnement avec la valeur
   de la colonne `openId` de ce compte, avant sa création, pour un rôle admin automatique)
