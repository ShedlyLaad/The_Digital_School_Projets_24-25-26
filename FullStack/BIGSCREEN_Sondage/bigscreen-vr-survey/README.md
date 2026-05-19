# Bigscreen VR Survey - Application de Sondage Communautaire

Une application React moderne et professionnelle pour les sondages en ligne destinée aux utilisateurs de Bigscreen VR, avec trois interfaces principales : sondage public, consultation des réponses et administration avec dashboard.

## 🚀 Fonctionnalités

### Interface Publique
- **Sondage interactif** : 20 questions avec 3 types différents
  - Questions à choix multiple (radio buttons)
  - Questions texte libre (255 caractères max)
  - Questions échelle numérique (1 à 5)
- **Validation en temps réel** : Toutes les questions sont obligatoires
- **Barre de progression** : Suivi visuel de l'avancement
- **Page de confirmation** : URL unique pour consulter les réponses

### Consultation des Réponses
- **Accès sécurisé** via URL unique
- **Affichage complet** des 20 questions et réponses
- **Design cohérent** avec le thème VR

### Administration Privée
- **Authentification sécurisée** (admin/bigscreen2024)
- **Dashboard avec statistiques** :
  - Total des réponses
  - Taux de complétion
  - Note moyenne
  - Dernière réponse
- **Visualisations graphiques** :
  - 3 Pie charts (questions 6, 7, 10)
  - 1 Radar chart (questions 11-15)
- **Gestion du questionnaire** : Vue d'ensemble des 20 questions
- **Gestion des réponses** : Tableaux avec export CSV

## 🎨 Design et Thème

### Thème VR
- **Couleurs principales** :
  - Violet VR (#8B5CF6)
  - Cyan tech (#06B6D4)
  - Orange énergique (#F59E0B)
- **Arrière-plan sombre** (#0F0F23) pour l'immersion
- **Effets visuels** : Gradients, ombres lumineuses, animations subtiles
- **Bordures pointillées** pour les zones de réponse (selon cahier des charges)

### Responsive Design
- **Compatible mobile et desktop**
- **Interface intuitive** avec feedback visuel
- **Animations fluides** pour améliorer l'expérience

## 🛠️ Technologies Utilisées

### Frontend
- **React 19** avec hooks modernes
- **React Router** pour la navigation
- **Tailwind CSS** pour le styling
- **Shadcn/UI** pour les composants
- **Lucide React** pour les icônes

### Graphiques et Visualisations
- **Recharts** pour les pie charts et radar chart
- **Responsive design** pour tous les graphiques

### Gestion d'État
- **Hooks personnalisés** (useSurvey, useAuth)
- **LocalStorage** pour la simulation d'API
- **Validation côté client** avec feedback en temps réel

## 📁 Structure du Projet

```
src/
├── components/
│   ├── admin/           # Composants d'administration
│   │   ├── StatsCards.jsx
│   │   └── ChartsGrid.jsx
│   ├── auth/            # Authentification
│   │   └── ProtectedRoute.jsx
│   ├── layouts/         # Layouts de l'application
│   │   ├── MainLayout.jsx
│   │   └── AdminLayout.jsx
│   ├── survey/          # Composants de sondage
│   │   ├── SurveyQuestion.jsx
│   │   ├── SurveyProgress.jsx
│   │   ├── SurveyNavigation.jsx
│   │   └── SurveyComplete.jsx
│   └── ui/              # Composants UI (Shadcn)
├── hooks/               # Hooks personnalisés
│   ├── useSurvey.js
│   └── useAuth.js
├── lib/                 # Utilitaires et constantes
│   ├── constants.js
│   └── utils.js
├── pages/               # Pages de l'application
│   ├── admin/
│   │   ├── LoginPage.jsx
│   │   ├── DashboardPage.jsx
│   │   ├── QuestionsPage.jsx
│   │   └── ResponsesPage.jsx
│   ├── HomePage.jsx
│   ├── SurveyPage.jsx
│   └── ResponsePage.jsx
├── App.jsx              # Composant principal avec routing
├── App.css              # Styles personnalisés VR
└── main.jsx             # Point d'entrée
```

## 🚀 Installation et Démarrage

### Prérequis
- Node.js 20.x ou supérieur
- npm ou pnpm

### Installation
```bash
# Cloner le projet
git clone <repository-url>
cd bigscreen-vr-survey

# Installer les dépendances
npm install
# ou
pnpm install
```

### Démarrage en développement
```bash
npm run dev
# ou
pnpm run dev
```

L'application sera accessible sur `http://localhost:5173`

### Build pour production
```bash
npm run build
# ou
pnpm run build
```

## 🔐 Authentification Admin

### Identifiants de démonstration
- **Utilisateur** : `admin`
- **Mot de passe** : `bigscreen2024`

## 📊 Questions du Sondage

Le sondage comprend 20 questions réparties comme suit :
- **7 questions à choix multiple** : Expérience utilisateur, préférences
- **5 questions texte libre** : Feedback détaillé (255 caractères max)
- **8 questions échelle** : Évaluations numériques (1-5)

### Questions pour les graphiques
- **Pie Charts** : Questions 6, 7, 10
- **Radar Chart** : Questions 11-15 (évaluations qualité)

## 🎯 Fonctionnalités Avancées

### Validation et UX
- **Validation en temps réel** avec messages d'erreur
- **Sauvegarde automatique** des réponses
- **Navigation fluide** entre les questions
- **Indicateurs visuels** de progression

### Administration
- **Dashboard interactif** avec métriques en temps réel
- **Export CSV** des réponses
- **Recherche et filtrage** des réponses
- **Vue détaillée** de chaque réponse

### Personnalisation
- **Thème facilement modifiable** via CSS variables
- **Questions configurables** via constants.js
- **Types de graphiques modulaires**
- **Messages personnalisables**

## 🔧 Personnalisation

### Modifier le thème
Éditez les variables CSS dans `src/App.css` :
```css
:root {
  --primary: #8B5CF6;    /* Violet VR */
  --secondary: #06B6D4;  /* Cyan tech */
  --accent: #F59E0B;     /* Orange énergique */
  /* ... autres variables */
}
```

### Modifier les questions
Éditez le fichier `src/lib/constants.js` :
```javascript
export const SURVEY_QUESTIONS = [
  {
    id: 1,
    type: 'multiple_choice',
    question: "Votre question ici",
    options: ["Option 1", "Option 2"]
  },
  // ... autres questions
];
```

### Modifier les graphiques
Configurez les questions pour les graphiques dans `src/lib/constants.js` :
```javascript
export const CHART_CONFIG = {
  PIE_CHARTS: [6, 7, 10],        // Questions pour pie charts
  RADAR_CHART: [11, 12, 13, 14, 15], // Questions pour radar chart
  // ...
};
```

## 📱 Responsive Design

L'application est entièrement responsive et optimisée pour :
- **Desktop** : Interface complète avec sidebar
- **Tablet** : Adaptation des layouts
- **Mobile** : Interface tactile optimisée

## 🔒 Sécurité

### Simulation d'API
- **LocalStorage** pour le stockage des données
- **Authentification simulée** avec tokens
- **Validation côté client** pour toutes les entrées

### Production
Pour un déploiement en production, remplacez :
- Le système d'authentification par une vraie API
- Le stockage LocalStorage par une base de données
- Ajoutez la validation côté serveur

## 🚀 Déploiement

### Build de production
```bash
npm run build
```

### Déploiement statique
Les fichiers de build peuvent être déployés sur :
- Netlify
- Vercel
- GitHub Pages
- Tout serveur web statique

## 🤝 Contribution

### Structure de développement
1. **Phases modulaires** : Développement par fonctionnalités
2. **Composants réutilisables** : Architecture modulaire
3. **Hooks personnalisés** : Logique métier séparée
4. **Styles cohérents** : Thème centralisé

### Bonnes pratiques
- **Code lisible** avec commentaires
- **Composants modulaires** et réutilisables
- **Gestion d'état** centralisée
- **Responsive design** par défaut

## 📄 Licence

Ce projet est développé pour Bigscreen VR. Tous droits réservés.

## 📞 Support

Pour toute question ou support technique, contactez l'équipe de développement.

---

**Développé avec ❤️ pour la communauté Bigscreen VR**

