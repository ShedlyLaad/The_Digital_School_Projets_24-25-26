<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Utilisateur;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Laravel\Sanctum\HasApiTokens;

class UtilisateurController extends Controller
{
     use HasApiTokens;
    public function index()
    {
        $utilisateurs = Utilisateur::all();
        return response()->json($utilisateurs);
    }

      public function register(Request $request)
    {
        $request->validate([
            'nom' => 'required|string',
            'prenom' => 'required|string',
            'email' => 'required|email|unique:utilisateur',
            'mot_de_passe' => 'required|string|min:6',
            'role' => 'required|in:admin,etudiant',
        ]);

        $utilisateur = new Utilisateur();
        $utilisateur->Nom = $request->nom;
        $utilisateur->Prenom = $request->prenom;
        $utilisateur->Email = $request->email;
        $utilisateur->MotDePasse = Hash::make($request->mot_de_passe);
        $utilisateur->Role = $request->role;
        $utilisateur->save();

        return response()->json(['message' => 'Utilisateur enregistré avec succès'], 201);
    }
  public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'mot_de_passe' => 'required|string',
        ]);

        if (Auth::attempt(['Email' => $request->email, 'password' => $request->mot_de_passe])) {
            $utilisateur = Auth::user();
            $token = $utilisateur->createToken('AuthToken')->plainTextToken;

            return response()->json(['token' => $token], 200);
        } else {
            return response()->json(['message' => 'Adresse email ou mot de passe incorrect'], 401);
        }
    }
}
