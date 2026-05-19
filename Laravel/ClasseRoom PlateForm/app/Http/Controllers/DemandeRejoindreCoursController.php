<?php

namespace App\Http\Controllers;

use App\Models\DemandeRejoindreCours;
use Illuminate\Http\Request;

class DemandeRejoindreCoursController extends Controller
{
    public function index()
    {
        return DemandeRejoindreCours::all();
    }

    public function store(Request $request)
    {
        return DemandeRejoindreCours::create($request->all());
    }

    public function show(DemandeRejoindreCours $demandeRejoindreCours)
    {
        return $demandeRejoindreCours;
    }

    public function update(Request $request, DemandeRejoindreCours $demandeRejoindreCours)
    {
        $demandeRejoindreCours->update($request->all());
        return $demandeRejoindreCours;
    }

    public function destroy(DemandeRejoindreCours $demandeRejoindreCours)
    {
        $demandeRejoindreCours->delete();
        return response()->json(null, 204);
    }
}