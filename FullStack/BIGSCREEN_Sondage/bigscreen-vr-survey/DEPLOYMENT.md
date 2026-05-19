# Guide de Déploiement - Bigscreen VR Survey

## 🚀 Options de déploiement

### 1. Déploiement statique (Recommandé pour la démo)

#### Netlify
```bash
# Build du projet
npm run build

# Déploiement via Netlify CLI
npm install -g netlify-cli
netlify deploy --prod --dir=dist
```

#### Vercel
```bash
# Installation de Vercel CLI
npm install -g vercel

# Déploiement
vercel --prod
```

#### GitHub Pages
```bash
# Installation de gh-pages
npm install --save-dev gh-pages

# Ajout du script dans package.json
"scripts": {
  "deploy": "gh-pages -d dist"
}

# Déploiement
npm run build
npm run deploy
```

### 2. Déploiement avec serveur

#### Docker
```dockerfile
# Dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

```bash
# Build et run
docker build -t bigscreen-vr-survey .
docker run -p 80:80 bigscreen-vr-survey
```

## 🔧 Configuration pour la production

### 1. Variables d'environnement

Créer un fichier `.env.production` :
```env
VITE_API_BASE_URL=https://api.bigscreen-survey.com
VITE_APP_TITLE=Bigscreen VR Survey
VITE_ADMIN_USERNAME=admin
VITE_ENABLE_ANALYTICS=true
```

### 2. Configuration Vite

```javascript
// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'terser',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          charts: ['recharts'],
          ui: ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu']
        }
      }
    }
  },
  server: {
    port: 3000,
    host: true
  }
})
```

### 3. Configuration Nginx

```nginx
# nginx.conf
server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;

    # Gestion des routes React Router
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache des assets statiques
    location /assets/ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
}
```

## 🔒 Migration vers une API réelle

### 1. Structure backend recommandée

#### API Endpoints
```
POST   /api/auth/login          # Authentification admin
POST   /api/auth/logout         # Déconnexion
GET    /api/auth/me             # Vérification token

POST   /api/survey/submit       # Soumission sondage
GET    /api/survey/response/:id # Consultation réponse

GET    /api/admin/stats         # Statistiques dashboard
GET    /api/admin/responses     # Liste des réponses
GET    /api/admin/responses/:id # Détail réponse
GET    /api/admin/export        # Export CSV
```

#### Base de données
```sql
-- Table des réponses
CREATE TABLE survey_responses (
    id VARCHAR(255) PRIMARY KEY,
    answers JSON NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    user_agent TEXT,
    ip_address VARCHAR(45)
);

-- Table des admins
CREATE TABLE admin_users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Index pour les performances
CREATE INDEX idx_responses_created_at ON survey_responses(created_at);
```

### 2. Adaptation du code frontend

#### Configuration API
```javascript
// src/lib/api.js
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api';

export const api = {
  async post(endpoint, data) {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getToken()}`
      },
      body: JSON.stringify(data)
    });
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }
    
    return response.json();
  },
  
  async get(endpoint) {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Authorization': `Bearer ${getToken()}`
      }
    });
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }
    
    return response.json();
  }
};
```

#### Remplacement des fonctions utils
```javascript
// Remplacer dans utils.js
export async function saveSurveyResponse(responses) {
  try {
    const result = await api.post('/survey/submit', { answers: responses });
    return result.responseId;
  } catch (error) {
    console.error('Erreur lors de la sauvegarde:', error);
    throw error;
  }
}

export async function authenticateAdmin(username, password) {
  try {
    const result = await api.post('/auth/login', { username, password });
    saveToLocalStorage('admin_token', result.token);
    return { success: true, token: result.token };
  } catch (error) {
    return { success: false, error: error.message };
  }
}
```

## 📊 Monitoring et Analytics

### 1. Google Analytics
```javascript
// src/lib/analytics.js
import { gtag } from 'ga-gtag';

export function initAnalytics() {
  if (import.meta.env.VITE_ENABLE_ANALYTICS === 'true') {
    gtag('config', 'GA_MEASUREMENT_ID');
  }
}

export function trackSurveyStart() {
  gtag('event', 'survey_start', {
    event_category: 'engagement'
  });
}

export function trackSurveyComplete() {
  gtag('event', 'survey_complete', {
    event_category: 'engagement'
  });
}
```

### 2. Error Tracking (Sentry)
```javascript
// src/main.jsx
import * as Sentry from "@sentry/react";

if (import.meta.env.PROD) {
  Sentry.init({
    dsn: "YOUR_SENTRY_DSN",
    environment: import.meta.env.MODE,
  });
}
```

## 🔧 Optimisations de performance

### 1. Code Splitting
```javascript
// Lazy loading des pages admin
const AdminLayout = lazy(() => import('./components/layouts/AdminLayout'));
const DashboardPage = lazy(() => import('./pages/admin/DashboardPage'));

// Wrapper avec Suspense
<Suspense fallback={<LoadingSpinner />}>
  <AdminLayout />
</Suspense>
```

### 2. Service Worker
```javascript
// public/sw.js
const CACHE_NAME = 'bigscreen-survey-v1';
const urlsToCache = [
  '/',
  '/static/js/bundle.js',
  '/static/css/main.css'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});
```

### 3. Bundle Analysis
```bash
# Analyse du bundle
npm install --save-dev vite-bundle-analyzer
npx vite-bundle-analyzer
```

## 🔒 Sécurité en production

### 1. Headers de sécurité
```nginx
# Dans nginx.conf
add_header X-Frame-Options "SAMEORIGIN" always;
add_header X-Content-Type-Options "nosniff" always;
add_header X-XSS-Protection "1; mode=block" always;
add_header Referrer-Policy "strict-origin-when-cross-origin" always;
add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline';" always;
```

### 2. HTTPS obligatoire
```nginx
# Redirection HTTP vers HTTPS
server {
    listen 80;
    server_name bigscreen-survey.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name bigscreen-survey.com;
    
    ssl_certificate /path/to/certificate.crt;
    ssl_certificate_key /path/to/private.key;
    
    # Configuration SSL moderne
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512;
}
```

### 3. Rate Limiting
```nginx
# Limitation du taux de requêtes
http {
    limit_req_zone $binary_remote_addr zone=api:10m rate=10r/m;
    
    server {
        location /api/ {
            limit_req zone=api burst=5 nodelay;
        }
    }
}
```

## 📈 Scaling et Performance

### 1. CDN Configuration
```javascript
// Configuration pour CloudFlare ou AWS CloudFront
const CDN_URL = 'https://cdn.bigscreen-survey.com';

// Dans vite.config.js pour la production
export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? CDN_URL : '/',
  build: {
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        assetFileNames: 'assets/[name].[hash][extname]',
        chunkFileNames: 'assets/[name].[hash].js',
        entryFileNames: 'assets/[name].[hash].js'
      }
    }
  }
});
```

### 2. Database Optimization
```sql
-- Index pour les requêtes fréquentes
CREATE INDEX idx_responses_date ON survey_responses(created_at DESC);
CREATE INDEX idx_responses_answers ON survey_responses USING GIN (answers);

-- Partitioning par date
CREATE TABLE survey_responses_2024 PARTITION OF survey_responses
FOR VALUES FROM ('2024-01-01') TO ('2025-01-01');
```

## 🚀 Checklist de déploiement

### Pré-déploiement
- [ ] Tests unitaires passent
- [ ] Tests d'intégration passent
- [ ] Build de production réussit
- [ ] Audit de sécurité effectué
- [ ] Performance testée
- [ ] Responsive design vérifié

### Configuration
- [ ] Variables d'environnement configurées
- [ ] Certificats SSL installés
- [ ] Base de données migrée
- [ ] Monitoring configuré
- [ ] Backup automatique configuré

### Post-déploiement
- [ ] Tests de fumée effectués
- [ ] Monitoring actif
- [ ] Logs vérifiés
- [ ] Performance mesurée
- [ ] Équipe notifiée

## 📞 Support et Maintenance

### 1. Logs et Debugging
```javascript
// Configuration des logs
const logger = {
  info: (message, data) => {
    if (import.meta.env.DEV) {
      console.log(`[INFO] ${message}`, data);
    }
  },
  error: (message, error) => {
    console.error(`[ERROR] ${message}`, error);
    // Envoyer à Sentry en production
  }
};
```

### 2. Health Checks
```javascript
// Endpoint de santé
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: process.env.APP_VERSION
  });
});
```

### 3. Backup Strategy
```bash
# Script de backup quotidien
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
mysqldump -u user -p database > backup_$DATE.sql
aws s3 cp backup_$DATE.sql s3://backups/bigscreen-survey/
```

---

Ce guide couvre tous les aspects du déploiement, de la configuration locale à la mise en production complète avec monitoring et sécurité.

