import { useState, useEffect } from 'react';
import { SURVEY_QUESTIONS as LOCAL_SURVEY_QUESTIONS } from '../../lib/constants';
import { fetchAdminQuestions } from '../../lib/utils';
import { Badge } from '@/components/ui/badge';
import '../../App.css';

export function QuestionsPage() {
  const [questions, setQuestions] = useState(LOCAL_SURVEY_QUESTIONS || []);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAdminQuestions().then(qs => {
      if (qs && qs.length) setQuestions(qs);
    }).catch((err) => {
      console.error('Erreur fetch questions:', err);
      setError('Impossible de charger les questions depuis l\'API.');
    }).finally(() => setLoading(false));
  }, []);

  const getTypeLabel = (type) => {
    switch (type) {
      case 'multiple_choice':
        return 'Choix multiple';
      case 'text':
        return 'Texte libre';
      case 'scale':
        return 'Échelle';
      default:
        return type;
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'multiple_choice':
        return 'bg-blue-500';
      case 'text':
        return 'bg-green-500';
      case 'scale':
        return 'bg-purple-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-glow">Questionnaire</h1>
        <p className="text-muted-foreground">
          Liste des 20 questions du sondage Bigscreen VR
        </p>
      </div>

      {loading && (
        <div className="text-center py-8">
          <div className="text-lg">Chargement des questions...</div>
        </div>
      )}

      {error && (
        <div className="text-center py-4 text-destructive">{error}</div>
      )}

      <div className="vr-card">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left p-4 font-medium">ID</th>
                <th className="text-left p-4 font-medium">Question</th>
                <th className="text-left p-4 font-medium">Type</th>
                <th className="text-left p-4 font-medium">Détails</th>
              </tr>
            </thead>
            <tbody>
              {questions.map((question) => (
                <tr key={question.id} className="border-b border-border/50 hover:bg-muted/20">
                  <td className="p-4">
                    <span className="bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium">
                      {question.id}
                    </span>
                  </td>
                  <td className="p-4">
                    <p className="font-medium">{question.question}</p>
                  </td>
                  <td className="p-4">
                    <Badge className={`${getTypeColor(question.type)} text-white`}>
                      {getTypeLabel(question.type)}
                    </Badge>
                  </td>
                  <td className="p-4">
                    {question.type === 'multiple_choice' && (
                      <div className="text-sm text-muted-foreground">
                        {question.options.length} options
                      </div>
                    )}
                    {question.type === 'text' && (
                      <div className="text-sm text-muted-foreground">
                        Max {question.maxLength} caractères
                      </div>
                    )}
                    {question.type === 'scale' && (
                      <div className="text-sm text-muted-foreground">
                        Échelle {question.min}-{question.max}
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <div className="vr-card p-4 text-center">
          <div className="text-2xl font-bold text-primary">
            {questions.filter(q => q.type === 'multiple_choice').length}
          </div>
          <div className="text-sm text-muted-foreground">Questions à choix multiple</div>
        </div>
        <div className="vr-card p-4 text-center">
          <div className="text-2xl font-bold text-secondary">
            {questions.filter(q => q.type === 'text').length}
          </div>
          <div className="text-sm text-muted-foreground">Questions texte libre</div>
        </div>
        <div className="vr-card p-4 text-center">
          <div className="text-2xl font-bold text-accent">
            {questions.filter(q => q.type === 'scale').length}
          </div>
          <div className="text-sm text-muted-foreground">Questions échelle</div>
        </div>
      </div>
    </div>
  );
}

