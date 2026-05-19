<?php

namespace App\Http\Controllers;

use App\Models\Survey;
use App\Services\ResponseService;
use Illuminate\Http\Request;
use App\Models\SurveyResponse;
use App\Mail\SurveyResponseConfirmation;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Log;

class ResponseController extends Controller
{
    protected $responseService;

    public function __construct(ResponseService $responseService)
    {
        $this->responseService = $responseService;
    }

    public function store(Request $request, Survey $survey)
    {
        $messages = [
            'email.required' => 'L\'email est obligatoire.',
            'email.email' => 'L\'email doit être valide.',
            'answers.required' => 'Toutes les réponses sont obligatoires.',
            'answers.array' => 'Le format des réponses est invalide.',
            'answers.*.question_id.required' => 'Chaque réponse doit être associée à une question.',
            'answers.*.question_id.exists' => 'La question n\'existe pas.',
            'answers.*.answer_text.string' => 'La réponse doit être une chaîne de caractères.',
            'answers.*.answer_numeric.integer' => 'La réponse doit être un nombre.',
        ];
        $validated = $request->validate([
            'email' => 'required|email',
            'answers' => 'required|array',
            'answers.*.question_id' => 'required|exists:questions,id',
            'answers.*.answer_text' => 'nullable|string',
            'answers.*.answer_numeric' => 'nullable|integer|min:1|max:10',
            'answers.*.answer_json' => 'nullable|json',
        ], $messages);

        try {
            // L'email et les autres données personnelles sont gérées dans le service
            $response = $this->responseService->createResponse($survey, $validated);
        } catch (\Exception $e) {
            Log::error('Erreur lors de la création de la réponse au sondage : ' . $e->getMessage());
            return response()->json([
                'message' => 'Une erreur est survenue lors de la soumission du sondage. Veuillez réessayer plus tard.'
            ], 500);
        }

        try {
            $previewUrl = url('/responses/' . $response->id);
            Mail::to($response->personaldata->email ?? $validated['email'])
                ->send(new SurveyResponseConfirmation($response, $previewUrl));
        } catch (\Throwable $mailError) {
            Log::warning('Envoi de mail échoué après création de réponse: ' . $mailError->getMessage());
        }

        $fresh = SurveyResponse::with(['answers.question', 'survey', 'personaldata'])->find($response->id);
        $result = [
            'id' => $fresh->id,
            'response_token' => $fresh->response_token,
            'survey_title' => $fresh->survey->title,
            'completed_at' => $fresh->completed_at,
            'personal_data' => [
                'email' => $fresh->personaldata->email,
                'nom' => $fresh->personaldata->nom,
                'prenom' => $fresh->personaldata->prenom,
                'pays' => $fresh->personaldata->pays,
                'is_adaptive' => $fresh->personaldata->is_adaptive,
            ],
            'questions' => $fresh->answers->map(function ($answer) {
                return [
                    'question_text' => $answer->question->question_text,
                    'question_type' => $answer->question->question_type,
                    'answer_text' => $answer->answer_text,
                    'answer_numeric' => $answer->answer_numeric,
                    'answer_json' => $answer->answer_json,
                ];
            })->values(),
        ];

        return response()->json($result, 201);
    }

    public function showByToken($response_token)
    {
        $response = SurveyResponse::where('response_token', $response_token)
            ->with(['answers.question', 'survey', 'personaldata'])
            ->first();
        if (!$response) {
            return response()->json(['message' => 'Réponse non trouvée'], 404);
        }

        $result = [
            'survey_title' => $response->survey->title,
            'completed_at' => $response->completed_at,
            'personal_data' => [
                'email' => $response->personaldata->email,
                'nom' => $response->personaldata->nom,
                'prenom' => $response->personaldata->prenom,
                'pays' => $response->personaldata->pays,
                'is_adaptive' => $response->personaldata->is_adaptive,
            ],
            'questions' => $response->answers->map(function ($answer) {
                return [
                    'question_text' => $answer->question->question_text,
                    'question_type' => $answer->question->question_type,
                    'answer_text' => $answer->answer_text,
                    'answer_numeric' => $answer->answer_numeric,
                    'answer_json' => $answer->answer_json,
                ];
            })->values(),
        ];
        return response()->json($result);
    }

    public function show($id)
    {
        $response = SurveyResponse::with(['answers.question', 'survey', 'personaldata'])->find($id);
        if (!$response) {
            return response()->json(['message' => 'Réponse non trouvée'], 404);
        }
        $result = [
            'id' => $response->id,
            'response_token' => $response->response_token,
            'survey_title' => $response->survey->title,
            'completed_at' => $response->completed_at,
            'personal_data' => [
                'email' => $response->personaldata->email,
                'nom' => $response->personaldata->nom,
                'prenom' => $response->personaldata->prenom,
                'pays' => $response->personaldata->pays,
                'is_adaptive' => $response->personaldata->is_adaptive,
            ],
            'questions' => $response->answers->map(function ($answer) {
                return [
                    'question_text' => $answer->question->question_text,
                    'question_type' => $answer->question->question_type,
                    'answer_text' => $answer->answer_text,
                    'answer_numeric' => $answer->answer_numeric,
                    'answer_json' => $answer->answer_json,
                ];
            })->values(),
        ];
        return response()->json($result);
    }
}