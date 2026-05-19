<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Survey;
use Illuminate\Http\Request;

class SurveyController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    public function index()
    {
        return Survey::all();
    }

    public function store(Request $request)
    {
        $messages = [
            'title.required' => 'Le titre du sondage est obligatoire.',
            'title.string' => 'Le titre doit être une chaîne de caractères.',
            'title.max' => 'Le titre ne doit pas dépasser 255 caractères.',
            'is_active.boolean' => 'Le champ actif doit être vrai ou faux.',
            'max_responses.integer' => 'Le nombre maximal de réponses doit être un entier.',
        ];
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'is_active' => 'boolean',
            'max_responses' => 'nullable|integer',
        ], $messages);
        try {
            $survey = Survey::create($request->all());
        } catch (\Exception $e) {
            \Log::error('Erreur création sondage admin : ' . $e->getMessage());
            return response()->json(['message' => 'Erreur lors de la création du sondage.'], 500);
        }
        return response()->json($survey, 201);
    }

    public function show(Survey $survey)
    {
        return $survey;
    }

    public function update(Request $request, Survey $survey)
    {
        $messages = [
            'title.string' => 'Le titre doit être une chaîne de caractères.',
            'title.max' => 'Le titre ne doit pas dépasser 255 caractères.',
            'is_active.boolean' => 'Le champ actif doit être vrai ou faux.',
            'max_responses.integer' => 'Le nombre maximal de réponses doit être un entier.',
        ];
        $request->validate([
            'title' => 'string|max:255',
            'description' => 'nullable|string',
            'is_active' => 'boolean',
            'max_responses' => 'nullable|integer',
        ], $messages);
        try {
            $survey->update($request->all());
        } catch (\Exception $e) {
            \Log::error('Erreur modification sondage admin : ' . $e->getMessage());
            return response()->json(['message' => 'Erreur lors de la modification du sondage.'], 500);
        }
        return response()->json($survey);
    }

    public function destroy(Survey $survey)
    {
        try {
            $survey->delete();
        } catch (\Exception $e) {
            \Log::error('Erreur suppression sondage admin : ' . $e->getMessage());
            return response()->json(['message' => 'Erreur lors de la suppression du sondage.'], 500);
        }
        return response()->json(null, 204);
    }

    public function allResponses()
    {
        try {
            $responses = \App\Models\SurveyResponse::with(['answers.question'])
                ->orderBy('created_at', 'desc')
                ->get();

            // Map to frontend-friendly shape: { id, timestamp, answers: { question_number: value } }
            $formatted = $responses->map(function ($r) {
                $answers = [];
                foreach ($r->answers as $a) {
                    // prefer question_number when available
                    $qnum = $a->question->question_number ?? $a->question_id ?? null;
                    $value = $a->answer_text ?? $a->answer_numeric ?? $a->answer ?? null;
                    if ($qnum !== null) {
                        $answers[$qnum] = $value;
                    }
                }

                return [
                    'id' => (string) $r->id,
                    'timestamp' => $r->created_at ? $r->created_at->toIso8601String() : now()->toIso8601String(),
                    'answers' => $answers,
                ];
            });

        } catch (\Exception $e) {
            \Log::error('Erreur récupération réponses admin : ' . $e->getMessage());
            return response()->json(['message' => 'Erreur lors de la récupération des réponses.'], 500);
        }

        return response()->json($formatted);
    }

    // Ajout d'un endpoint pour les stats du dashboard
    public function dashboardStats()
    {
        try {
            $totalResponses = \App\Models\SurveyResponse::count();
            $completedResponses = \App\Models\SurveyResponse::where('is_completed', true)->count();
            $questionsCount = \App\Models\Question::count();

            // Statistiques par question (exemple: moyenne pour les scales)
            $scaleStats = [];
            $scaleQuestions = \App\Models\Question::where('question_type', 'C')->get();
            foreach ($scaleQuestions as $q) {
                $avg = \App\Models\Answer::where('question_id', $q->id)->avg('answer_numeric');
                $scaleStats[$q->question_number] = round($avg, 2);
            }

            return response()->json([
                'total_responses' => $totalResponses,
                'completed_responses' => $completedResponses,
                'questions_count' => $questionsCount,
                'scale_stats' => $scaleStats,
            ]);
        } catch (\Exception $e) {
            \Log::error('Erreur dashboard stats admin : ' . $e->getMessage());
            return response()->json(['message' => 'Erreur lors de la récupération des stats.'], 500);
        }
    }
}