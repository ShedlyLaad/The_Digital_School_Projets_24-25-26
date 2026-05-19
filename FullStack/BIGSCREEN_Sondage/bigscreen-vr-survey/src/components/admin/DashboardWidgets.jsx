// components/admin/DashboardWidgets.jsx

import React from 'react';
import * as XLSX from 'xlsx';
import {
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend,
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar
} from 'recharts';
import { Users, MessageSquare, TrendingUp, Clock } from 'lucide-react';
import { formatChartData, formatRadarData, formatDate } from '../../lib/utils';
import { CHART_CONFIG, SURVEY_QUESTIONS } from '../../lib/constants';
import '../../App.css';

export function KPICards({ responses }) {
  const totalResponses = responses?.length || 0;
  const latestResponse = totalResponses > 0 ? responses[responses.length - 1] : null;
  const completionRate = totalResponses > 0 ? 100 : 0;

  const scaleQuestions = CHART_CONFIG.RADAR_CHART;
  const averageRating = totalResponses > 0
    ? scaleQuestions.reduce((acc, questionId) => {
        const values = responses.map(r => parseFloat(r.answers?.[questionId])).filter(v => !isNaN(v));
        const avg = values.length > 0 ? values.reduce((s, v) => s + v, 0) / values.length : 0;
        return acc + avg;
      }, 0) / scaleQuestions.length
    : 0;

  const stats = [
    { title: 'Total des réponses', value: totalResponses, icon: Users, color: 'text-primary', bgColor: 'bg-primary/10' },
    { title: 'Taux de complétion', value: `${completionRate}%`, icon: TrendingUp, color: 'text-green-500', bgColor: 'bg-green-500/10' },
    { title: 'Note moyenne', value: averageRating.toFixed(1), icon: MessageSquare, color: 'text-secondary', bgColor: 'bg-secondary/10' },
    { title: 'Dernière réponse', value: latestResponse ? formatDate(latestResponse.timestamp).split(' ')[0] : 'Aucune', icon: Clock, color: 'text-accent', bgColor: 'bg-accent/10' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, idx) => {
        const Icon = stat.icon;
        return (
          <div key={idx} className="vr-card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{stat.title}</p>
                <p className="text-2xl font-bold mt-1">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                <Icon className={`w-6 h-6 ${stat.color}`} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function PieChartsGrid({ responses, questionIds = CHART_CONFIG.PIE_CHARTS }) {
  const colors = Object.values(CHART_CONFIG.COLORS);

  return (
    <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
      {questionIds.map((questionId) => {
        const question = SURVEY_QUESTIONS.find(q => q.id === questionId);
        let data = formatChartData(responses, questionId);
        // Si aucune donnée, créer un pie chart avec toutes les valeurs à 0
        if (!data || data.length === 0) {
          data = [
            { name: 'A', value: 0, percentage: 0 },
            { name: 'B', value: 0, percentage: 0 },
            { name: 'C', value: 0, percentage: 0 }
          ];
        }
        return (
          <div key={questionId} className="chart-container vr-card p-4">
            <h3 className="text-lg font-semibold mb-4 text-muted-foreground">
              Question {questionId}: {question?.question || ''}
            </h3>
            <div style={{ width: '100%', height: 300 }}>
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={data}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    labelLine={false}
                    label={({ name, percentage }) => `${name} (${percentage}%)`}
                  >
                    {data.map((entry, idx) => (
                      <Cell key={`cell-${idx}`} fill={colors[idx % colors.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
              {/* Si toutes les valeurs sont à 0, afficher le texte au centre */}
              {data.every(d => d.value === 0) && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-muted-foreground font-bold">0</span>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function RadarPanel({ responses, questionIds = CHART_CONFIG.RADAR_CHART }) {
  const data = formatRadarData(responses, questionIds);
  const scores = data?.map(d => d.value) || [];
  const avgScore = scores.length > 0 ? (scores.reduce((a, b) => a + b, 0) / scores.length) : 0;
  // Couleur dynamique selon le score
  const getScoreColor = (score) => {
    if (score >= 4.5) return '#22c55e'; // green
    if (score >= 3.5) return '#eab308'; // yellow
    if (score > 0) return '#ef4444'; // red
    return '#d1d5db'; // gray
  };

  // Données pour le donut
  const donutData = [
    { name: 'Score', value: avgScore },
    { name: 'Reste', value: Math.max(0, 5 - avgScore) }
  ];

  return (
    <div className="vr-card p-6 space-y-6">
      <div className="flex items-center justify-between mb-2">
        <div>
          <h3 className="text-xl font-bold text-glow mb-1">Évaluation globale (Questions 11-15)</h3>
          <p className="text-muted-foreground text-sm">Synthèse des axes clés de l'expérience utilisateur</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        <div className="flex flex-col justify-center">
          <span className="font-semibold text-muted-foreground">Axes évalués :</span>
          <ul className="list-disc ml-6 text-sm mt-1">
            <li>Q11 : Qualité audio</li>
            <li>Q12 : Stabilité</li>
            <li>Q13 : Variété du contenu</li>
            <li>Q14 : Performance</li>
            <li>Q15 : Expérience sociale</li>
          </ul>
          <div className="mt-4 text-sm">
            {avgScore >= 4.5 && <span className="text-green-600 font-bold">Excellente expérience globale</span>}
            {avgScore >= 3.5 && avgScore < 4.5 && <span className="text-yellow-600 font-bold">Bonne expérience, quelques axes à améliorer</span>}
            {avgScore > 0 && avgScore < 3.5 && <span className="text-red-600 font-bold">Expérience à améliorer</span>}
            {avgScore === 0 && <span className="text-gray-500">Aucune donnée disponible</span>}
          </div>
        </div>
        <div className="flex flex-col items-center justify-center">
          <div style={{ width: '220px', height: '220px', position: 'relative' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={donutData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={100}
                  startAngle={90}
                  endAngle={450}
                  paddingAngle={2}
                  isAnimationActive={true}
                >
                  <Cell key="score" fill={getScoreColor(avgScore)} />
                  <Cell key="rest" fill="#e5e7eb" />
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              textAlign: 'center',
              pointerEvents: 'none'
            }}>
              <span className="font-bold text-3xl" style={{ color: getScoreColor(avgScore) }}>{avgScore > 0 ? avgScore.toFixed(2) : '--'}</span>
              <div className="text-xs text-muted-foreground">Score moyen / 5</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Résumé global des charts
export function ChartsSummary({ responses }) {
  const totalResponses = responses?.length || 0;
  const scaleQuestions = CHART_CONFIG.RADAR_CHART;
  const averageRating = totalResponses > 0
    ? scaleQuestions.reduce((acc, questionId) => {
        const values = responses.map(r => parseFloat(r.answers?.[questionId])).filter(v => !isNaN(v));
        const avg = values.length > 0 ? values.reduce((s, v) => s + v, 0) / values.length : 0;
        return acc + avg;
      }, 0) / scaleQuestions.length
    : 0;

  const pieSummary = CHART_CONFIG.PIE_CHARTS.map(qid => {
    const values = responses.map(r => r.answers?.[qid]).filter(v => v !== undefined);
    return {
      questionId: qid,
      total: values.length,
      values: values
    };
  });

  const radarSummary = scaleQuestions.map(qid => {
    const values = responses.map(r => parseFloat(r.answers?.[qid])). filter(v => !isNaN(v));
    const avg = values.length > 0 ? values.reduce((s, v) => s + v, 0) / values.length : 0;
    return {
      questionId: qid,
      average: avg.toFixed(2)
    };
  });

  return (
    <div className="mb-8 p-6 rounded-xl bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-2 h-8 bg-gradient-to-b from-primary to-primary/60 rounded-full"></div>
        <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200">Synthèse Analytique</h2>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Section Radar Charts */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
            <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-300">Graphique Radar - Évaluation Qualité</h3>
          </div>
          <div className="bg-white dark:bg-slate-800 p-4 rounded-lg border border-slate-200 dark:border-slate-600">
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-3 leading-relaxed">
              Ce graphique est de type <span className="font-semibold text-blue-600 dark:text-blue-400">Radar Charts</span> et regroupe les résultats qualité 
              des axes clés de l'expérience utilisateur sur une échelle de 1 à 5.
            </p>
            <div className="space-y-2">
              <div className="flex justify-between items-center py-2 border-b border-slate-100 dark:border-slate-700">
                <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Score moyen global</span>
                <span className="font-bold text-lg text-slate-800 dark:text-slate-200">{averageRating.toFixed(2)}/5</span>
              </div>
              <div className="space-y-1">
                {radarSummary.map(r => (
                  <div key={r.questionId} className="flex justify-between items-center text-sm">
                    <span className="text-slate-600 dark:text-slate-400">Question {r.questionId}</span>
                    <span className="font-medium text-slate-700 dark:text-slate-300">{r.average}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Section Pie Charts */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-3 h-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"></div>
            <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-300">Graphiques Circulaires</h3>
          </div>
          <div className="bg-white dark:bg-slate-800 p-4 rounded-lg border border-slate-200 dark:border-slate-600">
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-3 leading-relaxed">
              Répartition des réponses par catégorie avec visualisation des proportions en pourcentage.
            </p>
            <div className="space-y-1">
              {pieSummary.map(p => (
                <div key={p.questionId} className="flex justify-between items-center text-sm py-1">
                  <span className="text-slate-600 dark:text-slate-400">Question {p.questionId}</span>
                  <span className="font-medium text-slate-700 dark:text-slate-300">{p.total} réponses</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Métriques globales */}
      <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-700">
        <div className="flex items-center justify-between">
          <span className="text-sm text-slate-600 dark:text-slate-400">Total des réponses collectées</span>
          <span className="font-bold text-xl text-primary">{totalResponses}</span>
        </div>
      </div>
    </div>
  );
}

export function ExportExcelButton({ responses }) {
  const handleExport = () => {
    if (!responses || responses.length === 0) return;
    // Format data for Excel
    const flatData = responses.map((r, idx) => {
      const row = { Index: idx + 1, Timestamp: r.timestamp };
      Object.keys(r.answers || {}).forEach(qid => {
        row[`Q${qid}`] = r.answers[qid];
      });
      return row;
    });
    const ws = XLSX.utils.json_to_sheet(flatData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Réponses');
    XLSX.writeFile(wb, 'bigscreen_survey_export.xlsx');
  };
  return (
    <div className="w-full flex justify-end mt-8">
      <button
        onClick={handleExport}
        className="px-4 py-2 bg-primary text-white rounded-lg shadow hover:bg-primary/80 font-semibold"
      >
        Exporter en Excel
      </button>
    </div>
  );
}
