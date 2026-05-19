<?php

namespace App\Http\Controllers;

use App\Models\PersonalData;
use Illuminate\Http\Request;

class PersonalDataController extends Controller
{
    public function index()
    {
        return PersonalData::all();
    }

    public function show($id)
    {
        return PersonalData::findOrFail($id);
    }

    public function store(Request $request)
    {
        try {
            $data = $request->validate([
                'email' => 'required|email',
                'nom' => 'required|string',
                'prenom' => 'required|string',
                'pays' => 'required|string',
                'is_adaptive' => 'boolean',
            ]);
            // Log pour debug
            \Log::info('PersonalDataController@store payload:', $data);
            return PersonalData::create($data);
        } catch (\Illuminate\Validation\ValidationException $ve) {
            // Retourne les erreurs de validation au frontend
            return response()->json(['error' => $ve->errors()], 422);
        } catch (\Exception $e) {
            \Log::error('Erreur PersonalDataController@store : ' . $e->getMessage());
            // Ajoutez le message d'erreur exact dans la réponse pour debug frontend
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    // Méthode pour mettre à jour sexe et profession après sondage
    public function updateAfterSurvey(Request $request, $id)
    {
        $personalData = PersonalData::findOrFail($id);
        $data = $request->validate([
            'sexe' => 'required|string',
            'profession' => 'required|string',
        ]);
        $personalData->update($data);
        return $personalData;
    }

    public function update(Request $request, $id)
    {
        $personalData = PersonalData::findOrFail($id);
        $data = $request->validate([
            'email' => 'sometimes|email',
            'gender' => 'sometimes|string',
            'household_size' => 'sometimes|integer',
            'profession' => 'sometimes|string',
            'is_adaptive' => 'boolean',
            'name' => 'sometimes|string',
        ]);
        $personalData->update($data);
        return $personalData;
    }

    public function destroy($id)
    {
        $personalData = PersonalData::findOrFail($id);
        $personalData->delete();
        return response()->noContent();
    }

    public function adaptive()
    {
        return PersonalData::adaptive()->get();
    }
}
