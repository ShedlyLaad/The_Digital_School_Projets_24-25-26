<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Survey;
use App\Models\SurveyResponse;
use App\Models\Question;
use App\Models\Answer;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    public function index()
    {
        // Statistiques globales
        $totalResponses = SurveyResponse::count();
        $totalQuestions = Question::count();
        $totalSurveys = Survey::count();
        $completionRate = $totalResponses > 0 ? round(SurveyResponse::where('is_completed', true)->count() / $totalResponses * 100, 1) : 0;
        $averageTime = 'N/A'; // À calculer si tu as un champ de temps

        // PIE CHARTS : Q6, Q7, Q10
        $pieQuestions = [6, 7, 10];
        $pieCharts = [];
        foreach ($pieQuestions as $qNum) {
            $question = Question::where('question_number', $qNum)->first();
            if ($question) {
                $answers = Answer::where('question_id', $question->id)
                    ->select('answer_text', DB::raw('count(*) as count'))
                    ->groupBy('answer_text')
                    ->pluck('count', 'answer_text')
                    ->toArray();
                $pieCharts[] = [
                    'question' => 'Q' . $qNum . ': ' . $question->question_text,
                    'responses' => $answers,
                ];
            }
        }

        // RADAR CHART : Q11 à Q15 (on prend la moyenne des réponses numériques)
        $radarQuestions = range(11, 15);
        $radarChart = [];
        $averageSum = 0;
        $countAvg = 0;
        foreach ($radarQuestions as $qNum) {
            $question = Question::where('question_number', $qNum)->first();
            if ($question) {
                $avg = Answer::where('question_id', $question->id)
                    ->avg('answer_numeric');
                $value = $avg ? round($avg, 1) : 0;
                $radarChart[] = [
                    'questionId' => $qNum,
                    'subject' => 'Q' . $qNum . ': ' . $question->question_text,
                    'value' => $value,
                    'fullMark' => 5,
                ];

                if ($value > 0) {
                    $averageSum += $value;
                    $countAvg++;
                }
            }
        }

        $averageRating = $countAvg > 0 ? round($averageSum / $countAvg, 1) : 0;

        // Dernière réponse
        $latestResponse = SurveyResponse::orderBy('created_at', 'desc')->first();
        $latestTimestamp = $latestResponse ? $latestResponse->created_at->toIso8601String() : null;

        return response()->json([
            'totalResponses' => $totalResponses,
            'totalQuestions' => $totalQuestions,
            'totalSurveys' => $totalSurveys,
            'completionRate' => $completionRate,
            'averageRating' => $averageRating,
            'latestResponse' => $latestTimestamp,
            'pieCharts' => $pieCharts,
            'radarChart' => $radarChart,
        ]);
    }
}