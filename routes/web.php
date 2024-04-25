<?php

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Laravel\Sanctum\PersonalAccessToken;

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

//Auth::routes(['verify' => true]);

Route::get('/laravel', function () {
    // Fetch all valid tokens
    $tokens = PersonalAccessToken::where('expires_at', null)->get();
    return view('laravel', ['tokens' => $tokens]);
});

Route::get('/', function () {
    return view('welcome');
});

Route::get('/second', function () {
    return "<h1>This is the second page</h1><p>Some HTML content here </p>";
});
