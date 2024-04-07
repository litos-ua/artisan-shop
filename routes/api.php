<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\SearchController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Log;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/categories', [CategoryController::class, 'index']);
Route::post('/categories', [CategoryController::class, 'store']);
Route::get('/categories/{id}', [CategoryController::class, 'show']);
Route::put('/categories/{id}', [CategoryController::class, 'update']);
Route::delete('/categories/{id}', [CategoryController::class, 'destroy']);

Route::get('/products', [ProductController::class, 'index']);
Route::get('/products/category/{categoryId}', [ProductController::class, 'indexByCategory']);
Route::post('/products', [ProductController::class, 'store']);
Route::get('/products/{id}', [ProductController::class, 'show']);
Route::put('/products/{id}', [ProductController::class, 'update']);
Route::delete('/products/{id}', [ProductController::class, 'destroy']);

Route::get('/products/search/{search}', [SearchController::class, 'searchProducts']);


//Route::middleware('cors')->post('/register', function (Request $request) {
//Route::post('/register', function (Request $request) {
//    $validatedData = $request->validate([
//        'name' => 'required|string|min:3|max:20',
//        'email' => 'required|string|email|max:255|unique:users',
//        'password' => 'required|string|min:8',
//    ]);
//
//    $test = 1;
//
//    return response()->json(['message' => 'Registration successful'], 201);
//});

Route::group(['middleware' => 'auth:sanctum'], function () {
    // Logout route
    Route::post('/logout', [AuthController::class, 'logout']);

    // Other authenticated routes can go here...
});

// Public routes
Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);
