import { useState, useEffect } from 'react';
import { fetchAdminResponses } from '../../lib/utils';
import { KPICards, PieChartsGrid, RadarPanel } from '../../components/admin/DashboardWidgets';
import * as XLSX from 'xlsx';
import { ChartsSummary, ExportExcelButton } from '../../components/admin/DashboardWidgets';
import '../../App.css';

export function DashboardPage() {
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAdminResponses().then((allResponses) => {
      setResponses(allResponses || []);
    }).catch(err => {
      console.error('Erreur lors du chargement des données:', err);
      setResponses([]);
    }).finally(() => setLoading(false));
  }, []);

  const handleExportExcel = () => {
    if (!responses || responses.length === 0) return;
    // KPI
    const totalResponses = responses.length;
    const latestResponse = totalResponses > 0 ? responses[responses.length - 1] : null;
    const completionRate = totalResponses > 0 ? 100 : 0;
    const scaleQuestions = [11,12,13,14,15];
    const averageRating = totalResponses > 0
      ? scaleQuestions.reduce((acc, questionId) => {
          const values = responses.map(r => parseFloat(r.answers?.[questionId])).filter(v => !isNaN(v));
          const avg = values.length > 0 ? values.reduce((s, v) => s + v, 0) / values.length : 0;
          return acc + avg;
        }, 0) / scaleQuestions.length
      : 0;
    // KPI sheet
    const kpiSheet = [
      { 'Total des réponses': totalResponses },
      { 'Taux de complétion': `${completionRate}%` },
      { 'Note moyenne': averageRating.toFixed(2) },
      { 'Dernière réponse': latestResponse ? latestResponse.timestamp : 'Aucune' }
    ];
    // Pie charts
    const pieQuestions = [6,7,10];
    const pieSheet = pieQuestions.map(qid => {
      const values = responses.map(r => r.answers?.[qid]).filter(v => v !== undefined);
      return {
        [`Question ${qid}`]: values.length > 0 ? values.join(', ') : '0'
      };
    });
    // Radar
    const radarSheet = scaleQuestions.map(qid => {
      const values = responses.map(r => parseFloat(r.answers?.[qid])).filter(v => !isNaN(v));
      const avg = values.length > 0 ? values.reduce((s, v) => s + v, 0) / values.length : 0;
      return {
        [`Q${qid}`]: avg.toFixed(2)
      };
    });
    // Réponses brutes
    const data = responses.map(r => ({
      id: r.id,
      timestamp: r.timestamp,
      ...r.answers
    }));
    // Génération Excel
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, XLSX.utils.json_to_sheet(kpiSheet), 'KPI');
    XLSX.utils.book_append_sheet(workbook, XLSX.utils.json_to_sheet(pieSheet), 'Répartition');
    XLSX.utils.book_append_sheet(workbook, XLSX.utils.json_to_sheet(radarSheet), 'Évaluation globale');
    XLSX.utils.book_append_sheet(workbook, XLSX.utils.json_to_sheet(data), 'Réponses');
    // Format nom de fichier avec date JJ-MM-AAAA
    const now = new Date();
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = now.getFullYear();
    const fileName = `bigscreen_sondage_resumé_${day}-${month}-${year}.xlsx`;
    XLSX.writeFile(workbook, fileName);
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-glow">Dashboard</h1>
        <div className="text-center py-12">
          <div className="text-lg">Chargement des données...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-glow">Dashboard</h1>
        <p className="text-muted-foreground">
          Vue d'ensemble des réponses au sondage Bigscreen VR
        </p>
      </div>
      <KPICards responses={responses} />
      <div className="space-y-8">
        <PieChartsGrid responses={responses} />
        <RadarPanel responses={responses} />
      </div>
      <div className="flex justify-end mt-8">
        <button
          onClick={handleExportExcel}
          className="vr-button px-6 py-2 rounded-md bg-primary text-white font-semibold shadow hover:bg-primary/80 transition-colors"
        >
          Exporter en Excel
        </button>
      </div>
    </div>
  );
}
