import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// Génération d'ID unique pour les réponses
export function generateUniqueId() {
  return Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
}

// Validation des réponses
export function validateSurveyResponse(responses, questions) {
  const errors = {};
  
  questions.forEach(question => {
    const response = responses[question.id];
    
    if (!response || response === '') {
      errors[question.id] = 'Cette question est obligatoire';
      return;
    }
    
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

// Formatage des données pour les graphiques
export function formatChartData(responses, questionId) {
  const questionResponses = responses.map(r => r.answers[questionId]).filter(Boolean);
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

// Formatage des données pour le radar chart
export function formatRadarData(responses, questionIds) {
  const averages = {};
  
  questionIds.forEach(questionId => {
    const values = responses
      .map(r => parseInt(r.answers[questionId]))
      .filter(v => !isNaN(v));
    
    if (values.length > 0) {
      averages[questionId] = values.reduce((sum, val) => sum + val, 0) / values.length;
    }
  });
  
  return questionIds.map(questionId => ({
    subject: `Q${questionId}`,
    value: averages[questionId] || 0,
    fullMark: 5
  }));
}

// Simulation d'API - Sauvegarde locale
export function saveToLocalStorage(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
    return true;
  } catch (error) {
    console.error('Erreur lors de la sauvegarde:', error);
    return false;
  }
}

export function loadFromLocalStorage(key) {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Erreur lors du chargement:', error);
    return null;
  }
}

// Simulation d'API - Gestion des réponses
export function saveSurveyResponse(responses) {
  const responseId = generateUniqueId();
  const responseData = {
    id: responseId,
    answers: responses,
    timestamp: new Date().toISOString(),
    userAgent: navigator.userAgent
  };
  
  // Sauvegarder la réponse individuelle
  saveToLocalStorage(`survey_response_${responseId}`, responseData);
  
  // Ajouter à la liste des réponses
  const allResponses = loadFromLocalStorage('all_survey_responses') || [];
  allResponses.push(responseData);
  saveToLocalStorage('all_survey_responses', allResponses);
  
  return responseId;
}

export function getSurveyResponse(responseId) {
  return loadFromLocalStorage(`survey_response_${responseId}`);
}

export function getAllSurveyResponses() {
  return loadFromLocalStorage('all_survey_responses') || [];
}
// Admin auth helpers using sessionStorage (backend token)
export function isAdminAuthenticated() {
  const token = sessionStorage.getItem('bigscreen_admin_token');
  return !!token && token !== 'undefined';
}

export function logoutAdmin() {
  sessionStorage.removeItem('bigscreen_admin_token');
}

// Fetch helpers for admin area using runtime axios if available
import { adminAxios } from '../api';
import { SURVEY_QUESTIONS } from './constants';

function normalizeArrayResponse(res) {
  if (!res) return null;
  const body = res.data ?? res;
  if (Array.isArray(body)) return body;
  if (Array.isArray(body.data)) return body.data;
  if (Array.isArray(body.questions)) return body.questions;
  if (Array.isArray(body.responses)) return body.responses;
  if (Array.isArray(body.data?.questions)) return body.data.questions;
  if (Array.isArray(body.data?.responses)) return body.data.responses;
  return null;
}

export async function fetchAdminQuestions() {
  try {
    const res = await adminAxios.get('/admin/questions');
    const normalized = normalizeArrayResponse(res);
    if (normalized) {
      // map backend question shape to frontend SURVEY_QUESTIONS shape
      const mapped = normalized.map((q, idx) => {
        const id = q.id ?? q.question_number ?? (idx + 1);
        const rawType = q.question_type ?? q.type ?? q.questionType ?? null;
        const typeMap = {
          A: 'multiple_choice',
          B: 'text',
          C: 'scale'
        };
        const type = typeMap[rawType] || rawType || q.type || 'text';

        let options = [];
        if (q.options) {
          try {
            options = typeof q.options === 'string' ? JSON.parse(q.options) : q.options;
          } catch (e) {
            options = Array.isArray(q.options) ? q.options : [];
          }
        }

        const questionText = q.question_text ?? q.question ?? q.label ?? '';

        const mappedQuestion = {
          id,
          type,
          question: questionText,
          options: options || [],
          // text question
          maxLength: q.max_length ?? q.maxLength ?? 255,
          // scale question
          min: q.min ?? q.minimum ?? 1,
          max: q.max ?? q.maximum ?? 5,
        };

        return mappedQuestion;
      });

      return mapped;
    }
  } catch (e) {
    // eslint-disable-next-line no-console
    console.warn('fetchAdminQuestions failed, using local data fallback', e?.message || e);
  }
  // fallback: try to get from localStorage or bundled constants
  return loadFromLocalStorage('admin_questions') || SURVEY_QUESTIONS || [];
}

export async function fetchAdminResponses() {
  try {
    const res = await adminAxios.get('/admin/responses');
    const normalized = normalizeArrayResponse(res);
    if (normalized) return normalized;
  } catch (e) {
    // eslint-disable-next-line no-console
    console.warn('fetchAdminResponses failed, using local data fallback', e?.message || e);
  }
  // fallback to local storage list
  return loadFromLocalStorage('all_survey_responses') || [];
}

// Utilitaires de formatage
export function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

export function truncateText(text, maxLength) {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
}

// Statistiques globales pour le dashboard admin
export function computeSurveyStats(responses, questions) {
  const stats = {
    totalResponses: responses.length,
    completedResponses: responses.filter(r => r.completed_at).length,
    questionsCount: questions.length,
    scaleStats: {},
    choiceStats: {},
  };

  // Moyenne pour les questions de type scale
  questions.filter(q => q.type === 'scale').forEach(q => {
    const values = responses.map(r => parseInt(r.answers[q.id])).filter(v => !isNaN(v));
    if (values.length > 0) {
      stats.scaleStats[q.id] = (values.reduce((a, b) => a + b, 0) / values.length).toFixed(2);
    }
  });

  // Répartition pour les questions à choix
  questions.filter(q => q.type === 'multiple_choice').forEach(q => {
    const counts = {};
    responses.forEach(r => {
      const val = r.answers[q.id];
      if (val) counts[val] = (counts[val] || 0) + 1;
    });
    stats.choiceStats[q.id] = counts;
  });

  return stats;
}

