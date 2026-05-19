// src/pages/ResponsePage.jsx

import { useParams, useNavigate } from 'react-router-dom';
import Header from '@/components/common/Header';
import { useEffect, useState } from 'react';
import { fetchAnswerById } from '@/api/publicApi';
import ResponseView from '@/components/responses/ResponseView';

export function ResponsePage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [response, setResponse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        async function loadResponse() {
            setLoading(true);
            setError('');
            try {
                const data = await fetchAnswerById(id);
                setResponse(data);
            } catch (err) {
                setError('Aucune réponse trouvée.');
            }
            setLoading(false);
        }
        if (id) {
            loadResponse();
        } else {
            setError('ID de réponse manquant.');
            setLoading(false);
        }
    }, [id]);

    return (
        <div className="min-h-screen bg-background">
            <Header
                title="Bigscreen Survey"
                subtitle="Consultation de vos réponses"
            />
            <main className="py-8">
                {loading ? (
                    <div className="flex justify-center items-center min-h-[300px]">
                        <p className="text-muted-foreground animate-pulse">Chargement de votre réponse...</p>
                    </div>
                ) : error ? (
                    <div className="flex justify-center items-center min-h-[300px]">
                        <div className="vr-card p-6 text-center max-w-md">
                            <h2 className="text-destructive font-bold text-lg">{error}</h2>
                            <p className="text-muted-foreground mt-2">Vérifiez le lien ou contactez le support.</p>
                            <button
                                className="mt-6 px-4 py-2 bg-primary text-white rounded hover:bg-primary/80 transition"
                                onClick={() => navigate('/')}
                            >
                                Retour à l'accueil
                            </button>
                        </div>
                    </div>
                ) : (
                    <>
                        <ResponseView response={response} />
                        <div className="flex justify-center mt-8">
                            <button
                                className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/80 transition"
                                onClick={() => navigate('/')}
                            >
                                Retour à l'accueil
                            </button>
                        </div>
                    </>
                )}
            </main>
        </div>
    );
}