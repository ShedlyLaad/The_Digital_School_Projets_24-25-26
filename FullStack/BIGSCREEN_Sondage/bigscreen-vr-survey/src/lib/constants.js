// Questions du sondage Bigscreen VR
export const SURVEY_QUESTIONS = [
  {
    id: 1,
    type: 'text',
    question: 'Votre adresse mail',
    maxLength: 255,
    required: true
  },
  {
    id: 2,
    type: 'text',
    question: 'Votre âge',
    maxLength: 255,
    required: true
  },
  {
    id: 3,
    type: 'multiple_choice',
    question: 'Votre sexe',
    options: ['Homme', 'Femme', 'Préfère ne pas répondre'],
    required: true
  },
  {
    id: 4,
    type: 'scale',
    question: 'Nombre de personne dans votre foyer (adulte & enfants)',
    min: 1,
    max: 10,
    required: true
  },
  {
    id: 5,
    type: 'text',
    question: 'Votre profession',
    maxLength: 255,
    required: true
  },
  {
    id: 6,
    type: 'multiple_choice',
    question: 'Quel marque de casque VR utilisez-vous ?',
    options: ['Oculus Quest', 'Oculus Rift/s', 'HTC Vive', 'Windows Mixed Reality', 'Valve index'],
    required: true
  },
  {
    id: 7,
    type: 'multiple_choice',
    question: 'Sur quel magasin d’application achetez vous des contenus VR ?',
    options: ['SteamVR', 'Occulus store', 'Viveport', 'Windows store'],
    required: true
  },
  {
    id: 8,
    type: 'multiple_choice',
    question: 'Quel casque envisagez-vous d’acheter dans un futur proche ?',
    options: ['Occulus Quest', 'Occulus Go', 'HTC Vive Pro', 'PSVR', 'Autre', 'Aucun'],
    required: true
  },
  {
    id: 9,
    type: 'scale',
    question: 'Au sein de votre foyer, combien de personnes utilisent votre casque VR pour regarder Bigscreen ?',
    min: 1,
    max: 10,
    required: true
  },
  {
    id: 10,
    type: 'multiple_choice',
    question: 'Vous utilisez principalement Bigscreen pour :',
    options: ['regarder la TV en direct', 'regarder des films', 'travailler', 'jouer en solo', 'jouer en équipe'],
    required: true
  },
  {
    id: 11,
    type: 'scale',
    question: 'Combien donnez-vous de point pour la qualité de l’image sur Bigscreen ?',
    min: 1,
    max: 5,
    required: true
  },
  {
    id: 12,
    type: 'scale',
    question: 'Combien donnez-vous de point pour le confort d’utilisation de l’interface Bigscreen ?',
    min: 1,
    max: 5,
    required: true
  },
  {
    id: 13,
    type: 'scale',
    question: 'Combien donnez-vous de point pour la connexion réseau de Bigscreen ?',
    min: 1,
    max: 5,
    required: true
  },
  {
    id: 14,
    type: 'scale',
    question: 'Combien donnez-vous de point pour la qualité des graphismes 3D dans Bigscreen ?',
    min: 1,
    max: 5,
    required: true
  },
  {
    id: 15,
    type: 'scale',
    question: 'Combien donnez-vous de point pour la qualité audio dans Bigscreen ?',
    min: 1,
    max: 5,
    required: true
  },
  {
    id: 16,
    type: 'multiple_choice',
    question: 'Aimeriez-vous avoir des notifications plus précises au cours de vos sessions Bigscreen ?',
    options: ['Oui', 'Non'],
    required: true
  },
  {
    id: 17,
    type: 'multiple_choice',
    question: 'Aimeriez-vous pouvoir inviter un ami à rejoindre votre session via son smartphone ?',
    options: ['Oui', 'Non'],
    required: true
  },
  {
    id: 18,
    type: 'multiple_choice',
    question: 'Aimeriez-vous pouvoir enregistrer des émissions TV pour pouvoir les regarder ultérieurement ?',
    options: ['Oui', 'Non'],
    required: true
  },
  {
    id: 19,
    type: 'multiple_choice',
    question: 'Aimeriez-vous jouer à des jeux exclusifs sur votre Bigscreen ?',
    options: ['Oui', 'Non'],
    required: true
  },
  {
    id: 20,
    type: 'text',
    question: 'Quelle nouvelle fonctionnalité devrait exister sur Bigscreen ?',
    maxLength: 255,
    required: false
  }
];

// Types de questions
export const QUESTION_TYPES = {
  MULTIPLE_CHOICE: 'multiple_choice',
  TEXT: 'text',
  SCALE: 'scale'
};

// Messages de l'application
export const MESSAGES = {
  SURVEY_COMPLETE: "Merci d'avoir participé à notre sondage ! Vos réponses ont été enregistrées.",
  VALIDATION_REQUIRED: "Veuillez répondre à toutes les questions avant de continuer.",
  LOADING: "Chargement en cours...",
  ERROR_GENERIC: "Une erreur s'est produite. Veuillez réessayer.",
  LOGIN_REQUIRED: "Veuillez vous connecter pour accéder à cette page."
};

// Configuration des graphiques
export const CHART_CONFIG = {
  PIE_CHARTS: [6, 7, 10], // Questions pour les pie charts
  RADAR_CHART: [11, 12, 13, 14, 15], // Questions pour le radar chart
  COLORS: {
    primary: '#8B5CF6',
    secondary: '#06B6D4',
    accent: '#F59E0B',
    success: '#10B981',
    warning: '#F59E0B',
    error: '#EF4444'
  }
};

// Thème VR
export const VR_THEME = {
  colors: {
    primary: '#8B5CF6', // Violet VR
    secondary: '#06B6D4', // Cyan tech
    accent: '#F59E0B', // Orange énergique
    background: '#0F0F23', // Bleu très foncé
    surface: '#1A1A2E', // Bleu foncé
    text: '#FFFFFF',
    textSecondary: '#B0B0B0'
  },
  gradients: {
    primary: 'linear-gradient(135deg, #8B5CF6 0%, #06B6D4 100%)',
    secondary: 'linear-gradient(135deg, #06B6D4 0%, #8B5CF6 100%)',
    accent: 'linear-gradient(135deg, #F59E0B 0%, #EF4444 100%)'
  }
};

// Routes de l'application
export const ROUTES = {
  HOME: '/',
  SURVEY: '/survey',
  RESPONSES: '/responses',
  ADMIN_LOGIN: '/admin/login',
  ADMIN: '/admin',
  ADMIN_DASHBOARD: '/admin/dashboard',
  ABOUT_US: '/about-us',
  PROJECTS: '/projects',
  ADMIN_QUESTIONS: '/admin/questions',
  ADMIN_RESPONSES: '/admin/responses'
};

