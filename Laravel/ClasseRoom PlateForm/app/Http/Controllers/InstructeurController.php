<?php

namespace App\Http\Controllers;

use App\Models\Instructeur;
use Illuminate\Http\Request;

class InstructeurController extends Controller
{
    public function index()
    {
        return Instructeur::all();
    }

    public function store(Request $request)
    {
        return Instructeur::create($request->all());
    }

    public function show(Instructeur $instructeur)
    {
        return $instructeur;
    }

    public function update(Request $request, Instructeur $instructeur)
    {
        $instructeur->update($request->all());
        return $instructeur;
    }

    public function destroy(Instructeur $instructeur)
    {
        $instructeur->delete();
        return response()->json(null, 204);
    }
}