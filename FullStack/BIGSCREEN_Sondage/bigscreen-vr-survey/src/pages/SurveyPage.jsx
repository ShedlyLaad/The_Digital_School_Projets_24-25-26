import React, { useEffect, useState } from 'react';
import Header from '@/components/common/Header';
import SurveyForm from '@/components/survey/SurveyForm';
import ResponseView from '@/components/responses/ResponseView';
import { fetchSurveys, createPersonalData, submitSurveyResponse, fetchAnswerById } from '@/api/publicApi';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Select from 'react-select';

const customSelectStyles = {
  control: (provided, state) => ({
    ...provided,
    borderRadius: '8px',
    borderColor: state.isFocused ? '#6366f1' : '#e5e7eb', // focus: indigo-500, default: gray-200
    boxShadow: state.isFocused ? '0 0 0 2px #6366f133' : 'none',
    backgroundColor: '#f8fafc', // bg-slate-50
    minHeight: '44px',
    fontSize: '1rem',
    color: '#1e293b', // text-slate-800
    outline: 'none',
    transition: 'border-color 0.2s',
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected
      ? '#6366f1' // indigo-500
      : state.isFocused
      ? '#e0e7ff' // indigo-100
      : '#fff',
    color: state.isSelected ? '#fff' : '#1e293b',
    fontSize: '1rem',
    padding: '10px 16px',
    cursor: 'pointer',
  }),
  menu: (provided) => ({
    ...provided,
    borderRadius: '8px',
    boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
    backgroundColor: '#fff',
    zIndex: 20,
  }),
  singleValue: (provided) => ({
    ...provided,
    color: '#1e293b',
    fontWeight: 500,
  }),
  placeholder: (provided) => ({
    ...provided,
    color: '#64748b', // text-slate-400
    fontSize: '1rem',
  }),
  input: (provided) => ({
    ...provided,
    color: '#1e293b',
    fontSize: '1rem',
  }),
  dropdownIndicator: (provided, state) => ({
    ...provided,
    color: state.isFocused ? '#6366f1' : '#64748b',
  }),
  indicatorSeparator: () => ({
    display: 'none',
  }),
};

export function SurveyPage() {
  const [surveyId, setSurveyId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [networkError, setNetworkError] = useState('');
  const [showModal, setShowModal] = useState(true);
  const [countryList, setCountryList] = useState([]);
  const [personalData, setPersonalData] = useState({
    email: '',
    nom: '',
    prenom: '',
    pays: '',
    is_adaptive: true
  });
  const [error, setError] = useState('');
  const [submittedResponse, setSubmittedResponse] = useState(null);

  useEffect(() => {
    async function loadSurvey() {
      setLoading(true);
      setNetworkError('');
      try {
        const surveys = await fetchSurveys();
        if (surveys && surveys.length > 0) {
          setSurveyId(surveys[0].id);
        } else {
          setNetworkError("Aucun sondage disponible.");
        }
      } catch (err) {
        setNetworkError("Impossible de joindre le serveur. Vérifiez que le backend est démarré sur http://localhost:8000.");
      }
      setLoading(false);
    }
    loadSurvey();
  }, []);

  useEffect(() => {
    // Utiliser l'API backend pour charger la liste des pays
    fetch('http://localhost:8000/api/countries')
      .then(res => res.json())
      .then(data => {
        const countries = Array.isArray(data)
          ? data.map(c => ({ value: c, label: c }))
          : [];
        setCountryList(countries);
      })
      .catch(() => setCountryList([]));
  }, []);

  const savePersonalData = async (data) => {
    try {
      const payload = {
        email: data.email,
        nom: data.nom,
        prenom: data.prenom,
        pays: data.pays,
        is_adaptive: data.is_adaptive
      };
      const res = await createPersonalData(payload);
      return res;
    } catch (err) {
      setError(
        err.response?.data?.error || "Erreur lors de l'enregistrement des données. Vérifiez votre connexion et les champs."
      );
      return null;
    }
  };

  const handleModalSubmit = async (data) => {
    data.preventDefault();
    setError('');
    if (!personalData.email || !personalData.nom || !personalData.prenom || !personalData.pays) {
      setError("Tous les champs sont obligatoires.");
      return;
    }
    const result = await savePersonalData(personalData);
    if (result) {
      setShowModal(false);
    }
  };

  if (loading) {
    return <div className="text-center p-12">Chargement du sondage...</div>;
  }

  if (networkError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <Card className="max-w-md w-full mx-auto">
          <CardHeader>
            <CardTitle>Erreur de connexion</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-destructive">{networkError}</p>
            <p className="mt-2 text-muted-foreground">
              Assurez-vous que le backend Laravel est bien démarré sur <code>http://localhost:8000</code>.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-transparent relative">
      <Header 
        title="Sondage Bigscreen VR"
        subtitle="Votre avis compte pour améliorer votre expérience VR"
      />
      <main>
        {showModal && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <Card className="max-w-md w-full mx-auto">
              <CardHeader>
                <CardTitle>Informations personnelles</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleModalSubmit} className="space-y-4">
                  <Input
                    type="email"
                    placeholder="Email"
                    value={personalData.email}
                    onChange={e => setPersonalData({ ...personalData, email: e.target.value })}
                    required
                  />
                  <Input
                    type="text"
                    placeholder="Nom"
                    value={personalData.nom}
                    onChange={e => setPersonalData({ ...personalData, nom: e.target.value })}
                    required
                  />
                  <Input
                    type="text"
                    placeholder="Prénom"
                    value={personalData.prenom}
                    onChange={e => setPersonalData({ ...personalData, prenom: e.target.value })}
                    required
                  />
                  <div>
                    <label className="block mb-1 text-sm font-medium text-slate-700">Pays</label>
                    <Select
                      options={countryList}
                      value={countryList.find(c => c.value === personalData.pays) || null}
                      onChange={option => setPersonalData({ ...personalData, pays: option ? option.value : '' })}
                      placeholder="Sélectionnez votre pays"
                      isClearable
                      styles={customSelectStyles}
                      noOptionsMessage={() => "Aucun pays trouvé"}
                    />
                  </div>
                  {error && (
                    <div className="text-destructive text-sm">{error}</div>
                  )}
                  <div className="flex justify-end pt-2">
                    <Button type="submit" className="px-8 py-2">Commencer</Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        )}
        {!showModal && !submittedResponse && (
          <SurveyForm
            surveyId={surveyId}
            personalData={personalData}
            onError={err => {
              setError(
                err?.response?.data?.error ||
                err?.message ||
                "Erreur lors de l'envoi du sondage. Vérifiez votre connexion et les champs."
              );
            }}
            onSubmit={async (formPayload) => {
              setError('');
              try {
                const res = await submitSurveyResponse(surveyId, formPayload);
                // Charger la réponse complète pour affichage
                const responseData = await fetchAnswerById(res.id);
                setSubmittedResponse(responseData);
              } catch (err) {
                setError(
                  err?.response?.data?.error ||
                  err?.message ||
                  "Erreur lors de la soumission du sondage. Veuillez réessayer."
                );
              }
            }}
          />
        )}
        {submittedResponse && (
          <ResponseView response={submittedResponse} />
        )}
      </main>
    </div>
  );
}
