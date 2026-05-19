# Guide d'Architecture - Bigscreen VR Survey

## 🏗️ Vue d'ensemble de l'architecture

Cette application React suit une architecture modulaire et scalable, conçue pour être facilement maintenable et extensible.

## 📐 Principes de conception

### 1. Séparation des responsabilités
- **Composants UI** : Affichage et interactions utilisateur
- **Hooks personnalisés** : Logique métier et gestion d'état
- **Utilitaires** : Fonctions pures et helpers
- **Constants** : Configuration centralisée

### 2. Composition over Inheritance
- Utilisation de la composition React
- Hooks personnalisés pour la réutilisabilité
- Composants modulaires et configurables

### 3. Single Source of Truth
- État centralisé via hooks
- Configuration dans constants.js
- Thème unifié via CSS variables

## 🔧 Architecture des composants

### Structure hiérarchique

```
App (Router)
├── MainLayout
│   ├── HomePage
│   ├── SurveyPage
│   └── ResponsePage
├── LoginPage (standalone)
└── AdminLayout (Protected)
    ├── DashboardPage
    ├── QuestionsPage
    └── ResponsesPage
```

### Patterns utilisés

#### 1. Layout Pattern
```jsx
// MainLayout.jsx
export function MainLayout() {
  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8">
        <Outlet /> {/* Pages enfants */}
      </main>
    </div>
  );
}
```

#### 2. Compound Component Pattern
```jsx
// SurveyPage.jsx
<div className="max-w-4xl mx-auto space-y-8">
  <SurveyProgress progress={progress} />
  <SurveyQuestion question={currentQuestionData} />
  <SurveyNavigation onNext={goToNext} />
</div>
```

#### 3. Custom Hooks Pattern
```jsx
// useSurvey.js
export function useSurvey() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [responses, setResponses] = useState({});
  
  return {
    currentQuestion,
    responses,
    updateResponse,
    submitSurvey,
    // ... autres méthodes
  };
}
```

## 🎣 Hooks personnalisés

### useSurvey Hook
**Responsabilité** : Gestion complète du sondage

```javascript
const {
  currentQuestion,      // Question actuelle (index)
  responses,           // Réponses utilisateur
  errors,             // Erreurs de validation
  isSubmitting,       // État de soumission
  isCompleted,        // Sondage terminé
  responseId,         // ID de la réponse
  updateResponse,     // Mettre à jour une réponse
  goToNext,          // Question suivante
  goToPrevious,      // Question précédente
  submitSurvey,      // Soumettre le sondage
  getProgress        // Progression
} = useSurvey();
```

**Fonctionnalités** :
- Navigation entre questions
- Validation en temps réel
- Sauvegarde des réponses
- Calcul de progression
- Soumission avec gestion d'erreurs

### useAuth Hook
**Responsabilité** : Authentification admin

```javascript
const {
  isAuthenticated,    // État d'authentification
  isLoading,         // Chargement en cours
  error,             // Erreur d'authentification
  login,             // Fonction de connexion
  logout,            // Fonction de déconnexion
  clearError         // Effacer les erreurs
} = useAuth();
```

## 🎨 Système de design

### CSS Architecture

#### 1. Variables CSS centralisées
```css
:root {
  /* Couleurs principales */
  --primary: #8B5CF6;
  --secondary: #06B6D4;
  --accent: #F59E0B;
  
  /* Couleurs sémantiques */
  --background: #0F0F23;
  --foreground: #FFFFFF;
  --card: #1A1A2E;
  
  /* Espacements */
  --radius: 0.625rem;
}
```

#### 2. Classes utilitaires VR
```css
.vr-gradient {
  background: linear-gradient(135deg, #8B5CF6 0%, #06B6D4 100%);
}

.vr-card {
  @apply bg-card border border-border rounded-lg shadow-lg backdrop-blur-sm;
  background: rgba(26, 26, 46, 0.8);
}

.question-border {
  border: 2px dashed rgba(139, 92, 246, 0.3);
  border-radius: 8px;
  padding: 1rem;
  transition: border-color 0.2s ease;
}
```

#### 3. États interactifs
```css
.question-border.active {
  border-color: #8B5CF6;
  border-style: solid;
  background: rgba(139, 92, 246, 0.05);
}

.vr-button:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(139, 92, 246, 0.3);
}
```

## 🛣️ Routing et Navigation

### Structure des routes

```javascript
// App.jsx
<Routes>
  {/* Routes publiques */}
  <Route path="/" element={<MainLayout />}>
    <Route index element={<HomePage />} />
    <Route path="survey" element={<SurveyPage />} />
    <Route path="responses/:id" element={<ResponsePage />} />
  </Route>

  {/* Connexion admin */}
  <Route path="admin/login" element={<LoginPage />} />

  {/* Routes admin protégées */}
  <Route path="admin" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
    <Route path="dashboard" element={<DashboardPage />} />
    <Route path="questions" element={<QuestionsPage />} />
    <Route path="responses" element={<ResponsesPage />} />
  </Route>
</Routes>
```

### Protection des routes

```jsx
// ProtectedRoute.jsx
export function ProtectedRoute({ children }) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) return <LoadingSpinner />;
  if (!isAuthenticated) return <Navigate to="/admin/login" />;
  
  return children;
}
```

## 📊 Gestion des données

### Simulation d'API avec LocalStorage

#### Structure des données
```javascript
// Réponse individuelle
{
  id: "unique_id",
  answers: {
    1: "Moins de 6 mois",
    2: "Les fonctionnalités sociales",
    3: "4",
    // ... autres réponses
  },
  timestamp: "2024-01-01T12:00:00.000Z",
  userAgent: "Mozilla/5.0..."
}

// Liste de toutes les réponses
[
  { id: "response_1", answers: {...}, timestamp: "..." },
  { id: "response_2", answers: {...}, timestamp: "..." },
  // ...
]
```

#### Fonctions utilitaires
```javascript
// utils.js
export function saveSurveyResponse(responses) {
  const responseId = generateUniqueId();
  const responseData = {
    id: responseId,
    answers: responses,
    timestamp: new Date().toISOString()
  };
  
  // Sauvegarde individuelle
  saveToLocalStorage(`survey_response_${responseId}`, responseData);
  
  // Ajout à la liste globale
  const allResponses = loadFromLocalStorage('all_survey_responses') || [];
  allResponses.push(responseData);
  saveToLocalStorage('all_survey_responses', allResponses);
  
  return responseId;
}
```

## 📈 Visualisations de données

### Architecture des graphiques

#### 1. Formatage des données
```javascript
// utils.js
export function formatChartData(responses, questionId) {
  const questionResponses = responses
    .map(r => r.answers[questionId])
    .filter(Boolean);
    
  const counts = {};
  questionResponses.forEach(response => {
    counts[response] = (counts[response] || 0) + 1;
  });
  
  return Object.entries(counts).map(([name, value]) => ({
    name,
    value,
    percentage: Math.round((value / questionResponses.length) * 100)
  }));
}
```

#### 2. Composants de graphiques
```jsx
// ChartsGrid.jsx
export function ChartsGrid({ responses }) {
  const pieChartsData = CHART_CONFIG.PIE_CHARTS.map(questionId => ({
    questionId,
    question: SURVEY_QUESTIONS.find(q => q.id === questionId)?.question,
    data: formatChartData(responses, questionId)
  }));

  const radarData = formatRadarData(responses, CHART_CONFIG.RADAR_CHART);

  return (
    <div className="space-y-8">
      {/* Pie Charts */}
      <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {pieChartsData.map(chartData => renderPieChart(chartData))}
      </div>
      
      {/* Radar Chart */}
      <div className="grid lg:grid-cols-1 gap-6">
        {renderRadarChart(radarData)}
      </div>
    </div>
  );
}
```

## 🔒 Sécurité et Validation

### Validation côté client

#### 1. Validation des réponses
```javascript
// utils.js
export function validateSurveyResponse(responses, questions) {
  const errors = {};
  
  questions.forEach(question => {
    const response = responses[question.id];
    
    // Validation obligatoire
    if (!response || response === '') {
      errors[question.id] = 'Cette question est obligatoire';
      return;
    }
    
    // Validation spécifique par type
    if (question.type === 'text' && response.length > question.maxLength) {
      errors[question.id] = `Maximum ${question.maxLength} caractères`;
    }
    
    if (question.type === 'scale') {
      const value = parseInt(response);
      if (isNaN(value) || value < question.min || value > question.max) {
        errors[question.id] = `Valeur entre ${question.min} et ${question.max} requise`;
      }
    }
  });
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}
```

#### 2. Authentification simulée
```javascript
// utils.js
export function authenticateAdmin(username, password) {
  const validCredentials = {
    username: 'admin',
    password: 'bigscreen2024'
  };
  
  if (username === validCredentials.username && 
      password === validCredentials.password) {
    const token = generateUniqueId();
    saveToLocalStorage('admin_token', token);
    return { success: true, token };
  }
  
  return { success: false, error: 'Identifiants incorrects' };
}
```

## 🎯 Optimisations et Performance

### 1. Lazy Loading
```jsx
// Chargement différé des composants admin
const AdminLayout = lazy(() => import('./components/layouts/AdminLayout'));
const DashboardPage = lazy(() => import('./pages/admin/DashboardPage'));
```

### 2. Memoization
```jsx
// Mémorisation des calculs coûteux
const chartData = useMemo(() => 
  formatChartData(responses, questionId), 
  [responses, questionId]
);
```

### 3. Optimisation des re-renders
```jsx
// Callbacks mémorisés
const updateResponse = useCallback((questionId, value) => {
  setResponses(prev => ({
    ...prev,
    [questionId]: value
  }));
}, []);
```

## 🔧 Configuration et Personnalisation

### 1. Configuration centralisée
```javascript
// constants.js
export const SURVEY_QUESTIONS = [...];
export const CHART_CONFIG = {...};
export const VR_THEME = {...};
export const ROUTES = {...};
```

### 2. Thème modulaire
```css
/* Variables facilement modifiables */
:root {
  --primary: #8B5CF6;     /* Couleur principale */
  --secondary: #06B6D4;   /* Couleur secondaire */
  --accent: #F59E0B;      /* Couleur d'accent */
}
```

### 3. Types de questions extensibles
```javascript
// Ajout facile de nouveaux types
export const QUESTION_TYPES = {
  MULTIPLE_CHOICE: 'multiple_choice',
  TEXT: 'text',
  SCALE: 'scale',
  // Nouveaux types ici
};
```

## 🚀 Déploiement et Production

### Build optimisé
```bash
npm run build
```

### Considérations pour la production

#### 1. Remplacement de l'API simulée
- Remplacer LocalStorage par une vraie base de données
- Implémenter une API REST ou GraphQL
- Ajouter l'authentification JWT

#### 2. Sécurité
- Validation côté serveur
- Protection CSRF
- Rate limiting
- Chiffrement des données sensibles

#### 3. Performance
- CDN pour les assets statiques
- Compression gzip
- Cache des API
- Monitoring des performances

## 📚 Patterns et Bonnes Pratiques

### 1. Error Boundaries
```jsx
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallback />;
    }
    return this.props.children;
  }
}
```

### 2. Loading States
```jsx
// Gestion cohérente des états de chargement
if (isLoading) return <LoadingSpinner />;
if (error) return <ErrorMessage error={error} />;
if (!data) return <EmptyState />;
```

### 3. Accessibility
```jsx
// Labels et ARIA pour l'accessibilité
<Label htmlFor="username">Nom d'utilisateur</Label>
<Input
  id="username"
  aria-describedby="username-error"
  aria-invalid={!!error}
/>
```

## 🔄 Cycle de développement

### 1. Développement par phases
1. **Setup** : Configuration et structure
2. **Core** : Fonctionnalités principales
3. **UI/UX** : Interface et expérience
4. **Testing** : Tests et validation
5. **Documentation** : Guides et documentation

### 2. Testing Strategy
- **Unit Tests** : Fonctions utilitaires
- **Integration Tests** : Hooks et composants
- **E2E Tests** : Parcours utilisateur complets

### 3. Code Quality
- **ESLint** : Linting du code
- **Prettier** : Formatage automatique
- **TypeScript** : Typage statique (optionnel)

---

Cette architecture garantit une application maintenable, scalable et performante, tout en respectant les meilleures pratiques React modernes.

