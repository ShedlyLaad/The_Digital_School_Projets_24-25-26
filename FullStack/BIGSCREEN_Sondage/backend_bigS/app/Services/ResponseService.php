<?php

namespace App\Services;

use App\Models\Answer;
use App\Models\PersonalData;
use App\Models\Survey;
use App\Models\SurveyResponse;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;

class ResponseService
{
    public function createResponse(Survey $survey, array $validatedData): SurveyResponse
    {
        DB::beginTransaction();
        try {
            // Créer les données personnelles si elles n'existent pas
            $personalData = PersonalData::firstOrCreate(
                ['email' => $validatedData['email']],
                [
                    // Add nullable coalescing operator ?? '' to prevent errors if these fields are missing
                    'nom' => $validatedData['nom'] ?? '', 
                    'prenom' => $validatedData['prenom'] ?? '',
                    'pays' => $validatedData['pays'] ?? '',
                    'is_adaptive' => $validatedData['is_adaptive'] ?? false,
                ]
            );

            // Créer la réponse au sondage et la lier aux données personnelles
            $response = new SurveyResponse([
                'survey_id' => $survey->id,
                // uuid() génère 36 caractères, conforme à la colonne CHAR(36)
                'response_token' => (string) Str::uuid(),
                'email' => $validatedData['email'],
                'is_completed' => true,
                'completed_at' => now(),
            ]);
            // Associate the related personal data using the correct relation name defined on the model
            $response->personaldata()->associate($personalData);
            $response->save();

            // Créer les réponses aux questions
            foreach ($validatedData['answers'] as $answerData) {
                $answer = new Answer([
                    'question_id' => $answerData['question_id'],
                    'answer_text' => $answerData['answer_text'] ?? null,
                    'answer_numeric' => $answerData['answer_numeric'] ?? null,
                    'answer_json' => $answerData['answer_json'] ?? null,
                ]);
                $response->answers()->save($answer);
            }

            DB::commit();
            return $response;
        } catch (\Exception $e) {
            DB::rollBack();
            // This is the generic message you are seeing. For development, you can log the exception.
            throw $e; 
        }
    }
}