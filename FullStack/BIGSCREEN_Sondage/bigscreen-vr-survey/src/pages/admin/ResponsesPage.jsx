import { useState, useEffect } from 'react';
import { fetchAdminResponses, formatDate, truncateText } from '../../lib/utils';
import { SURVEY_QUESTIONS } from '../../lib/constants';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Download, Eye } from 'lucide-react';
import '../../App.css';

export function ResponsesPage() {
  const [responses, setResponses] = useState([]);
  const [filteredResponses, setFilteredResponses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedResponse, setSelectedResponse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // fetch responses via API helper which falls back to local data
    fetchAdminResponses().then(allResponses => {
      setResponses(allResponses || []);
      setFilteredResponses(allResponses || []);
      setLoading(false);
    }).catch(err => {
      console.error('Erreur lors du chargement des données:', err);
      setResponses([]);
      setFilteredResponses([]);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filtered = responses.filter(response => 
        response.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        Object.values(response.answers).some(answer => 
          answer.toString().toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
      setFilteredResponses(filtered);
    } else {
      setFilteredResponses(responses);
    }
  }, [searchTerm, responses]);

  const exportData = () => {
    const csvContent = [
      // Headers
      ['ID', 'Date', ...SURVEY_QUESTIONS.map(q => `Q${q.id}`)].join(','),
      // Data
      ...filteredResponses.map(response => [
        response.id,
        formatDate(response.timestamp),
        ...SURVEY_QUESTIONS.map(q => `"${response.answers[q.id] || ''}"`)
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `bigscreen-survey-responses-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-glow">Réponses</h1>
        <div className="text-center py-12">
          <div className="text-lg">Chargement des données...</div>
        </div>
      </div>
    );
  }

  if (selectedResponse) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-glow">Détail de la réponse</h1>
            <p className="text-muted-foreground">ID: {selectedResponse.id}</p>
          </div>
          <Button 
            variant="outline" 
            onClick={() => setSelectedResponse(null)}
          >
            Retour à la liste
          </Button>
        </div>

        <div className="vr-card p-6">
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div>
              <strong>Date de soumission:</strong>
              <p className="text-muted-foreground">{formatDate(selectedResponse.timestamp)}</p>
            </div>
            <div>
              <strong>ID de réponse:</strong>
              <p className="text-muted-foreground">{selectedResponse.id}</p>
            </div>
            {/* Ajout des données personnelles */}
            {selectedResponse.personalData && (
              <>
                <div>
                  <strong>Email:</strong>
                  <p className="text-muted-foreground">{selectedResponse.personalData.email}</p>
                </div>
                <div>
                  <strong>Nom:</strong>
                  <p className="text-muted-foreground">{selectedResponse.personalData.name}</p>
                </div>
                <div>
                  <strong>Profession:</strong>
                  <p className="text-muted-foreground">{selectedResponse.personalData.profession}</p>
                </div>
                <div>
                  <strong>Genre:</strong>
                  <p className="text-muted-foreground">{selectedResponse.personalData.gender}</p>
                </div>
                <div>
                  <strong>Adaptatif:</strong>
                  <p className="text-muted-foreground">{selectedResponse.personalData.is_adaptive ? 'Oui' : 'Non'}</p>
                </div>
              </>
            )}
          </div>

          <div className="space-y-4">
            {SURVEY_QUESTIONS.map((question) => (
              <div key={question.id} className="border-b border-border pb-4">
                <div className="flex items-start gap-3">
                  <span className="bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium">
                    {question.id}
                  </span>
                  <div className="flex-1">
                    <h4 className="font-medium mb-2">{question.question}</h4>
                    <div className="question-border active">
                      <p>{selectedResponse.answers[question.id] || 'Pas de réponse'}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-glow">Réponses</h1>
          <p className="text-muted-foreground">
            {filteredResponses.length} réponse(s) au sondage
          </p>
        </div>
        <Button onClick={exportData} className="vr-button">
          <Download className="w-4 h-4 mr-2" />
          Exporter CSV
        </Button>
      </div>

      {/* Search */}
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher dans les réponses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 vr-input"
          />
        </div>
      </div>

      {/* Responses table */}
      <div className="vr-card">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left p-4 font-medium">ID</th>
                <th className="text-left p-4 font-medium">Date</th>
                <th className="text-left p-4 font-medium">Aperçu</th>
                <th className="text-left p-4 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredResponses.map((response) => (
                <tr key={response.id} className="border-b border-border/50 hover:bg-muted/20">
                  <td className="p-4">
                    <Badge variant="outline">{response.id}</Badge>
                  </td>
                  <td className="p-4 text-sm text-muted-foreground">
                    {formatDate(response.timestamp)}
                  </td>
                  <td className="p-4">
                    <div className="text-sm">
                      {truncateText(
                        Object.values(response.answers).slice(0, 2).join(' • '), 
                        100
                      )}
                    </div>
                  </td>
                  <td className="p-4">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setSelectedResponse(response)}
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      Voir
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredResponses.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              {searchTerm ? 'Aucune réponse trouvée' : 'Aucune réponse disponible'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

