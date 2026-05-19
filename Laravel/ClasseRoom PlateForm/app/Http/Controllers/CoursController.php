<?php

namespace App\Http\Controllers;

use App\Models\Cours;
use Illuminate\Http\Request;

class CoursController extends Controller
{
    public function index()
    {
        return Cours::all();
    }

    public function store(Request $request)
    {
        // Spécifiez explicitement les champs autorisés à partir de la requête
        $cours = Cours::create($request->only([
            'Titre', 'NomInstructeur', 'Description', 'Duree', 'NiveauDifficulte',
            'NombreLecons', 'NombreQuizz', 'Prix', 'NombreEtudiantsAcceptes',
            'CategorieId', 'InstructeurId'
        ]));

        return response()->json($cours, 201);
    }

    public function show(Cours $cours)
    {
        return $cours;
    }

    public function update(Request $request, Cours $cours)
    {
        // Spécifiez explicitement les champs autorisés à partir de la requête
        $cours->update($request->only([
            'Titre', 'NomInstructeur', 'Description', 'Duree', 'NiveauDifficulte',
            'NombreLecons', 'NombreQuizz', 'Prix', 'NombreEtudiantsAcceptes',
            'CategorieId', 'InstructeurId'
        ]));

        return $cours;
    }

    public function destroy(Cours $cours)
    {
        $cours->delete();
        return response()->json(null, 204);
    }
}
