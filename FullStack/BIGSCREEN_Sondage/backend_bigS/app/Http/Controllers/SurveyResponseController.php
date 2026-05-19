<?php

namespace App\Http\Controllers;

use App\Models\Survey;
use App\Models\SurveyResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Log;

class SurveyResponseController extends Controller
{
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, $surveyId)
    {
        try {
            $validated = $request->validate([
                'email' => 'required|email',
                'answers' => 'required|array|min:1',
            ]);

            $survey = Survey::findOrFail($surveyId);

            $response = new SurveyResponse();
            $response->email = $validated['email'];
            $response->survey_id = $survey->id;
            $response->answers = json_encode($validated['answers']);
            $response->save();

            return response()->json(['message' => 'Réponse enregistrée avec succès.'], 201);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json(['message' => 'Données invalides.', 'errors' => $e->errors()], 422);
        } catch (\Exception $e) {
            Log::error('Erreur lors de la soumission du sondage: ' . $e->getMessage());
            return response()->json(['message' => 'Une erreur est survenue lors de la soumission du sondage. Veuillez réessayer plus tard.'], 500);
        }
    }
}