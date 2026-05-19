<?php

namespace App\Http\Controllers;

use App\Models\Feedback;
use Illuminate\Http\Request;

class FeedbackController extends Controller
{
    public function index()
    {
        return Feedback::all();
    }

    public function store(Request $request)
    {
        return Feedback::create($request->all());
    }

    public function show(Feedback $feedback)
    {
        return $feedback;
    }

    public function update(Request $request, Feedback $feedback)
    {
        $feedback->update($request->all());
        return $feedback;
    }

    public function destroy(Feedback $feedback)
    {
        $feedback->delete();
        return response()->json(null, 204);
    }
}