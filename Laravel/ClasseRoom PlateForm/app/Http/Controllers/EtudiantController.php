<?php

namespace App\Http\Controllers;

use App\Models\Cours;
use App\Models\Etudiant;
use App\Models\DemandeRejoindreCours;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class EtudiantController extends Controller
{
    public function posterCommentaire(Request $request, Cours $cours)
    {
        $request->validate([
            'commentaire' => 'required|string|max:255',
        ]);

        $etudiant = Auth::user()->etudiant;

        $commentaire = $cours->feedbacks()->create([
            'etudiant_id' => $etudiant->id,
            'commentaire' => $request->input('commentaire'),
        ]);

        return redirect()->back()->with('success', 'Commentaire ajouté avec succès!');
    }

    public function posterDemandeRejoindreCours(Request $request, Cours $cours)
    {
        $etudiant = Auth::user()->etudiant;

        if ($etudiant->demandes()->where('cours_id', $cours->id)->exists()) {
            return redirect()->back()->with('error', 'Vous avez déjà fait une demande pour ce cours.');
        }

        $demande = $cours->demandes()->create([
            'etudiant_id' => $etudiant->id,
            'status' => 'En attente',
        ]);

        return redirect()->back()->with('success', 'Demande envoyée avec succès!');

    }
}
