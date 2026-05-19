// src/lib/constants.js

export const QUESTION_TYPES = {
  MULTIPLE_CHOICE: 'A',
  TEXT: 'B',
  SCALE: 'C',
};

export const MESSAGES = {
  VALIDATION_ERRORS: {
    required: 'Ce champ est requis',
    email: 'Adresse email invalide',
    maxLength: 'Texte trop long',
  },
  SURVEY_COMPLETION: {
    title: 'Merci pour votre participation !',
    content: 'Vos réponses ont bien été enregistrées.',
    responseLink: 'Voici votre lien de consultation :',
  },
  SURVEY_COMPLETE: "Votre réponse a bien été enregistrée. Merci pour votre participation !",
};

export const ROUTES = {
  HOME: '/',
  SURVEY: '/survey',
  RESPONSES: '/responses/:id',
  ADMIN: '/admin',
  ADMIN_LOGIN: '/admin/login',
  ADMIN_DASHBOARD: '/admin/dashboard',
};
