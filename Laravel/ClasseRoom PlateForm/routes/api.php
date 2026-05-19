<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CoursController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\InstructeurController;
use App\Http\Controllers\FaqController;
use App\Http\Controllers\FeedbackController;
use App\Http\Controllers\EtudiantController;
use App\Http\Controllers\DemandeRejoindreCoursController;

Route::get('/cours', [CoursController::class, 'index']);
Route::post('/cours', [CoursController::class, 'store']);
Route::get('/cours/{cours}', [CoursController::class, 'show']);
Route::put('/cours/{cours}', [CoursController::class, 'update']);
Route::delete('/cours/{cours}', [CoursController::class, 'destroy']);

 
Route::get('/categories', [CategoryController::class, 'index']);
Route::post('/categories', [CategoryController::class, 'store']);
Route::get('/categories/{category}', [CategoryController::class, 'show']);
Route::put('/categories/{category}', [CategoryController::class, 'update']);
Route::delete('/categories/{category}', [CategoryController::class, 'destroy']);

Route::get('/feedbacks', [FeedbackController::class, 'index']);
Route::post('/feedbacks', [FeedbackController::class, 'store']);
Route::get('/feedbacks/{feedback}', [FeedbackController::class, 'show']);
Route::put('/feedbacks/{feedback}', [FeedbackController::class, 'update']);
Route::delete('/feedbacks/{feedback}', [FeedbackController::class, 'destroy']);

Route::post('/cours/{cours}/commentaires', [EtudiantController::class, 'posterCommentaire']);
Route::post('/cours/{cours}/demandes', [EtudiantController::class, 'posterDemandeRejoindreCours']);

Route::get('/demandes-rejoindre-cours', [DemandeRejoindreCoursController::class, 'index']);
Route::post('/demandes-rejoindre-cours', [DemandeRejoindreCoursController::class, 'store']);
Route::get('/demandes-rejoindre-cours/{demandeRejoindreCours}', [DemandeRejoindreCoursController::class, 'show']);
Route::put('/demandes-rejoindre-cours/{demandeRejoindreCours}', [DemandeRejoindreCoursController::class, 'update']);
Route::delete('/demandes-rejoindre-cours/{demandeRejoindreCours}', [DemandeRejoindreCoursController::class, 'destroy']);

Route::get('/cours/search', [CoursController::class, 'search']);
Route::get('/faqs', [FaqController::class, 'index']);
Route::post('/faqs', [FaqController::class, 'store']);
Route::get('/faqs/{faq}', [FaqController::class, 'show']);
Route::put('/faqs/{faq}', [FaqController::class, 'update']);
Route::delete('/faqs/{faq}', [FaqController::class, 'destroy']);


Route::get('/instructeurs', [InstructeurController::class, 'index']);
Route::post('/instructeurs', [InstructeurController::class, 'store']);
Route::get('/instructeurs/{instructeur}', [InstructeurController::class, 'show']);
Route::put('/instructeurs/{instructeur}', [InstructeurController::class, 'update']);
Route::delete('/instructeurs/{instructeur}', [InstructeurController::class, 'destroy']);
