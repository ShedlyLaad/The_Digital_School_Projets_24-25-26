<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PersonalDataController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::resource('personal-data', PersonalDataController::class);
Route::get('personal-data-adaptive', [PersonalDataController::class, 'adaptive']);
