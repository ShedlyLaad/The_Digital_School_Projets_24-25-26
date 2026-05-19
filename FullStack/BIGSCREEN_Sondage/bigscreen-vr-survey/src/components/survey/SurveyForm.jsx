// src/components/survey/SurveyForm.jsx

import React, { useEffect, useState } from 'react';
import { useSurvey } from '@/hooks/useSurvey';
import QuestionCard, { QUESTION_TYPES } from './QuestionCard';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';
import { MESSAGES } from '@/lib/constants';
import { fetchSurveyQuestions, submitSurveyResponse } from '@/api/publicApi';
import { useNavigate } from 'react-router-dom';

const SurveyForm = ({ surveyId, personalData, onSubmit, onError }) => {
    const {
        responses,
        errors,
        isCompleted,
        responseId,
        updateResponse,
        getProgress
    } = useSurvey();

    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        async function loadQuestions() {
            setLoading(true);
            setError(null);
            try {
                const data = await fetchSurveyQuestions(surveyId);
                if (!Array.isArray(data)) throw new Error("Format inattendu des questions");
                setQuestions(data);
            } catch (err) {
                setError("Erreur lors du chargement des questions. Veuillez réessayer.");
            } finally {
                setLoading(false);
            }
        }
        loadQuestions();
    }, [surveyId]);

    const prepareAnswers = () => {
        return questions.map(q => {
            if (q.question_type === 'C') {
                if (responses[q.id] !== undefined && responses[q.id] !== null && responses[q.id] !== '') {
                    const numericValue = typeof responses[q.id] === 'number' ? responses[q.id] : Number(responses[q.id]);
                    if (Number.isNaN(numericValue)) {
                        return null;
                    }
                    return {
                        question_id: q.id,
                        answer_numeric: numericValue,
                    };
                }
            } else if (q.question_type === 'B' || q.question_type === 'A') {
                if (responses[q.id] && responses[q.id] !== '') {
                    return {
                        question_id: q.id,
                        answer_text: responses[q.id],
                    };
                }
            }
            if (responses[q.id] && responses[q.id] !== '') {
                return {
                    question_id: q.id,
                    answer_text: responses[q.id],
                };
            }
            return null;
        }).filter(a => a !== null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);
        const answers = prepareAnswers();
        if (!answers || answers.length === 0) {
            setIsSubmitting(false);
            const msg = "Aucune réponse valide à envoyer. Veuillez répondre au moins à une question.";
            setError(msg);
            if (typeof onError === 'function') {
                onError(new Error(msg));
            }
            return;
        }
        try {
            // Updated payload to include all personal data fields
            const payload = {
                ...personalData, // Use the spread operator to include all fields
                answers,
            };
            if (typeof onSubmit === 'function') {
                await onSubmit(payload);
                return;
            }
            const result = await submitSurveyResponse(surveyId, payload);
            if (result && (result.id || result.data?.id)) {
                const responseId = result.id ?? result.data.id;
                navigate(`/responses/${responseId}`);
            } else {
                setError("Erreur lors de la soumission du sondage.");
            }
        } catch (err) {
            setError("Erreur lors de la soumission du sondage. Veuillez réessayer.");
            if (typeof onError === 'function') {
                onError(err);
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isCompleted) {
        const responseUrl = `${window.location.origin}/responses/${responseId}`;
        return (
            <div className="container mx-auto max-w-2xl px-4 py-8">
                <div className="text-center space-y-6">
                    <CheckCircle className="h-16 w-16 text-green-600 mx-auto" />
                    <h2 className="text-2xl font-bold text-green-800">{MESSAGES.SURVEY_COMPLETION.title}</h2>
                    <p className="text-green-700 font-bold">{MESSAGES.SURVEY_COMPLETION.content}</p>
                    <code className="text-sm bg-muted p-2 rounded">{responseUrl}</code>
                </div>
            </div>
        );
    }

    if (loading) return <div>Chargement des questions...</div>;

    return (
        <form onSubmit={handleSubmit} className="container mx-auto max-w-4xl px-4 py-8 space-y-6">
            {questions.map((question) => (
                <QuestionCard
                    key={question.id}
                    question={question}
                    value={responses[question.id]}
                    onChange={(val) => updateResponse(question.id, val)}
                    error={errors[question.id]}
                />
            ))}
            <div className="flex justify-center pt-4">
                <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-10 py-3 text-lg"
                >
                    {isSubmitting ? 'Envoi en cours...' : 'Finaliser'}
                </Button>
            </div>
            {error && (
                <div className="text-red-600 text-center py-4">{error}</div>
            )}
        </form>
    );
};

export default SurveyForm;