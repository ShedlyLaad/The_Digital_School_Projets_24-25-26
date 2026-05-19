import { useState, useCallback } from 'react';
import { SURVEY_QUESTIONS } from '../lib/constants';
import { validateSurveyResponse, saveSurveyResponse } from '../lib/utils';

export function useSurvey() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [responses, setResponses] = useState({});
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [responseId, setResponseId] = useState(null);

  const updateResponse = useCallback((questionId, value) => {
    setResponses(prev => ({
      ...prev,
      [questionId]: value
    }));
    
    // Effacer l'erreur si elle existe
    if (errors[questionId]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[questionId];
        return newErrors;
      });
    }
  }, [errors]);

  const goToNext = useCallback(() => {
    if (currentQuestion < SURVEY_QUESTIONS.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    }
  }, [currentQuestion]);

  const goToPrevious = useCallback(() => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  }, [currentQuestion]);

  const goToQuestion = useCallback((questionIndex) => {
    if (questionIndex >= 0 && questionIndex < SURVEY_QUESTIONS.length) {
      setCurrentQuestion(questionIndex);
    }
  }, []);

  const validateCurrentQuestion = useCallback(() => {
    const question = SURVEY_QUESTIONS[currentQuestion];
    const response = responses[question.id];
    
    if (!response || response === '') {
      setErrors(prev => ({
        ...prev,
        [question.id]: 'Cette question est obligatoire'
      }));
      return false;
    }
    
    return true;
  }, [currentQuestion, responses]);

  const submitSurvey = useCallback(async (personalData) => {
    setIsSubmitting(true);
    
    try {
      // Validation complète
      const validation = validateSurveyResponse(responses, SURVEY_QUESTIONS);
      
      if (!validation.isValid) {
        setErrors(validation.errors);
        setIsSubmitting(false);
        return { success: false, errors: validation.errors };
      }
      
      // Simulation d'un délai d'API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Payload pour l'API
      const payload = {
        email: personalData.email,
        name: personalData.name,
        profession: personalData.profession,
        answers: Object.entries(responses).map(([question_id, value]) => ({
          question_id,
          answer_text: typeof value === 'string' ? value : null,
          answer_numeric: typeof value === 'number' ? value : null,
          // ...other answer fields if needed...
        })),
      };
      
      // Sauvegarder les réponses
      const id = saveSurveyResponse(payload);
      
      setResponseId(id);
      setIsCompleted(true);
      setIsSubmitting(false);
      
      return { success: true, responseId: id };
    } catch (error) {
      console.error('Erreur lors de la soumission:', error);
      setIsSubmitting(false);
      return { success: false, error: 'Erreur lors de la soumission' };
    }
  }, [responses]);

  const resetSurvey = useCallback(() => {
    setCurrentQuestion(0);
    setResponses({});
    setErrors({});
    setIsSubmitting(false);
    setIsCompleted(false);
    setResponseId(null);
  }, []);

  const getProgress = useCallback(() => {
    const answeredQuestions = Object.keys(responses).length;
    return {
      current: currentQuestion + 1,
      total: SURVEY_QUESTIONS.length,
      answered: answeredQuestions,
      percentage: Math.round((answeredQuestions / SURVEY_QUESTIONS.length) * 100)
    };
  }, [currentQuestion, responses]);

  return {
    // État
    currentQuestion,
    responses,
    errors,
    isSubmitting,
    isCompleted,
    responseId,
    
    // Actions
    updateResponse,
    goToNext,
    goToPrevious,
    goToQuestion,
    validateCurrentQuestion,
    submitSurvey,
    resetSurvey,
    
    // Utilitaires
    getProgress,
    currentQuestionData: SURVEY_QUESTIONS[currentQuestion],
    allQuestions: SURVEY_QUESTIONS,
    canGoNext: currentQuestion < SURVEY_QUESTIONS.length - 1,
    canGoPrevious: currentQuestion > 0,
    isLastQuestion: currentQuestion === SURVEY_QUESTIONS.length - 1
  };
}

