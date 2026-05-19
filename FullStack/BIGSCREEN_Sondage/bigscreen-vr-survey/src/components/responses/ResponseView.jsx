// src/components/responses/ResponseView.jsx

import React from 'react';

const ResponseView = ({ response }) => {
    if (!response) return null;

    return (
        <div className="container mx-auto max-w-4xl px-4">
            <div className="vr-card p-6 border border-border shadow-lg glow-effect">
                <div className="mb-4">
                    <h1 className="text-2xl font-bold text-primary text-glow">{response.survey_title}</h1>
                    <div className="flex flex-col md:flex-row md:justify-between md:items-center mt-2 text-sm text-muted-foreground">
                        <span>
                            Date de soumission :{' '}
                            <span className="text-foreground font-medium">
                                {response.completed_at
                                    ? new Date(response.completed_at).toLocaleString('fr-FR')
                                    : '-'}
                            </span>
                        </span>
                        <span className="mt-2 md:mt-0 bg-primary/10 text-primary px-3 py-1 rounded text-xs font-semibold">
                            Réponse #{response.id ?? ''}
                        </span>
                    </div>
                </div>

                <div className="border-t border-border mt-6 pt-6">
                    <h2 className="text-lg font-semibold text-primary mb-4">Résumé de vos réponses</h2>
                    <div className="grid gap-6">
                        {(response.questions ?? []).map((q, idx) => (
                            <div key={idx} className="vr-card p-4 question-border">
                                <div className="flex flex-col gap-2">
                                    <p className="text-base font-semibold text-foreground">{q.question_text}</p>
                                    <p className="text-primary font-medium text-base">
                                        {(() => {
                                            if (q.answer_text) return q.answer_text;
                                            if (typeof q.answer_numeric === 'number') return q.answer_numeric;
                                            if (q.answer_json) {
                                                try {
                                                    const parsed = typeof q.answer_json === 'string' ? JSON.parse(q.answer_json) : q.answer_json;
                                                    return JSON.stringify(parsed);
                                                } catch (_) {
                                                    return String(q.answer_json);
                                                }
                                            }
                                            return <span className="text-muted-foreground italic">Non répondu</span>;
                                        })()}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResponseView;