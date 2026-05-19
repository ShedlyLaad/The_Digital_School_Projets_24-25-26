<?php

namespace App\Http\Controllers;

use App\Models\Faq;
use Illuminate\Http\Request;

class FaqController extends Controller
{
    public function index()
    {
        return Faq::all();
    }

    public function store(Request $request)
    {
        return Faq::create($request->all());
    }

    public function show(Faq $faq)
    {
        return $faq;
    }

    public function update(Request $request, Faq $faq)
    {
        $faq->update($request->all());
        return $faq;
    }

    public function destroy(Faq $faq)
    {
        $faq->delete();
        return response()->json(null, 204);
    }
}