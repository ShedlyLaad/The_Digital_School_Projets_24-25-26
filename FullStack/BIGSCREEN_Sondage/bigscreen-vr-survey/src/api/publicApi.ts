import { publicAxios } from './index';

export const fetchSurveys = async () => {
    const { data } = await publicAxios.get('/surveys');
    return data;
};

export const fetchSurveyQuestions = async (surveyId: number | string) => {
    const { data } = await publicAxios.get(`/surveys/${surveyId}/questions`);
    return data;
};

export const submitSurveyResponse = async (surveyId: number | string, payload: any) => {
    if (
        !payload ||
        !payload.email ||
        !Array.isArray(payload.answers) ||
        payload.answers.some(a =>
            typeof a.question_id === 'undefined' ||
            (
                (typeof a.answer_text === 'undefined' || a.answer_text === '' || a.answer_text === null) &&
                (typeof a.answer_numeric === 'undefined' || a.answer_numeric === null) &&
                (typeof a.answer_json === 'undefined' || a.answer_json === null)
            )
        )
    ) {
        throw new Error('Le format des réponses est invalide. Chaque réponse doit contenir question_id et une valeur de réponse.');
    }
    try {
        const normalizedAnswers = payload.answers.map((a: any) => {
            const result: any = { question_id: a.question_id };
            if (typeof a.answer_numeric !== 'undefined' && a.answer_numeric !== null) {
                const n = Number(a.answer_numeric);
                if (!Number.isNaN(n)) {
                    result.answer_numeric = Math.round(n);
                }
            }
            if (typeof a.answer_text === 'string') {
                const t = a.answer_text.trim();
                if (t !== '') {
                    result.answer_text = t;
                }
            }
            if (a.answer_json) {
                if (typeof a.answer_json === 'string') {
                    try {
                        JSON.parse(a.answer_json);
                        result.answer_json = a.answer_json;
                    } catch (_) {
                    }
                } else if (typeof a.answer_json === 'object' && Object.keys(a.answer_json).length > 0) {
                    result.answer_json = JSON.stringify(a.answer_json);
                }
            }
            return result;
        });

        const filteredAnswers = normalizedAnswers.filter((a: any) =>
            (
                typeof a.answer_numeric === 'number' && a.answer_numeric !== null
            ) ||
            (
                typeof a.answer_text === 'string' && a.answer_text.trim() !== ''
            ) ||
            (
                typeof a.answer_json === 'string' && a.answer_json.trim() !== ''
            )
        );
        if (!filteredAnswers.length) {
            throw new Error('Aucune réponse valide à envoyer. Veuillez répondre au moins à une question.');
        }
        const filteredPayload = {
            ...payload,
            answers: filteredAnswers
        };
        // ANCIENNE LIGNE CAUSANT L'ERREUR : delete filteredPayload.email;
        // La ligne ci-dessus a été supprimée pour que l'email soit envoyé au backend.

        console.log('Payload envoyé:', JSON.stringify(filteredPayload));
        const { data } = await publicAxios.post(`/surveys/${surveyId}/responses`, filteredPayload);
        return data;
    } catch (err: any) {
        if (err && typeof err === 'object' && 'response' in err && (err as any).response) {
            const r = (err as any).response;
            const safeData = typeof r?.data === 'string' ? r.data : JSON.stringify(r?.data);
            console.error('Erreur API:', safeData, 'Status:', r?.status, 'Payload:', JSON.stringify(payload));
        } else {
            console.error('Erreur API:', (err as any)?.message, 'Payload:', JSON.stringify(payload));
        }
        throw err;
    }
};

export const fetchAnswerById = async (id: string | number) => {
    try {
        const { data } = await publicAxios.get(`/answers/${id}`);
        return data;
    } catch (err: any) {
        console.error('Erreur lors de la récupération de la réponse par ID:', err);
        throw err;
    }
};

export const createPersonalData = async (data: { email: string; nom: string; prenom: string; pays: string; is_adaptive: boolean; }) => {
    const res = await fetch('http://localhost:8000/api/personal-data', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            email: data.email,
            nom: data.nom,
            prenom: data.prenom,
            pays: data.pays,
            is_adaptive: data.is_adaptive
        }),
    });

    if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || 'Erreur serveur');
    }

    return await res.json();
};

export const fetchAdminDashboardStats = async () => {
    const res = await fetch('http://localhost:8000/api/admin/dashboard', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
        }
    });
    if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || 'Erreur serveur');
    }
    return await res.json();
};