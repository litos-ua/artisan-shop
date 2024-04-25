<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\SearchController;
use App\Http\Controllers\Mail\VerificationController;
use App\Models\User;
use Illuminate\Foundation\Auth\EmailVerificationRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Str;
use Laravel\Sanctum\PersonalAccessToken;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
*/


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




Route::group(['middleware' => 'auth:sanctum'], function () {
    // Logout route
    Route::post('/logout', [AuthController::class, 'logout']);

    // Other authenticated routes can go here...
});

// Public routes
Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);

/*
|--------------------------------------------------------------------------
| Email verification routes
|--------------------------------------------------------------------------
*/

// Display a page instructing the user to click a link to verify their email, has sent by Laravel for finish registration
Route::get('/email/verify', function () {
    // Return a response or redirect to a frontend route where you display the verification instructions
})->middleware(['auth'])->name('verification.notice');

// Handle the request generated when the user clicks the email verification link

//Route::get('/email/verify/{id}/{hash}', function (Request $request, $id, $hash) {
//    $user = User::findOrFail($id);
//
//    if ($user->hasVerifiedEmail()) {
//        return redirect('/'); // Redirect if email is already verified
//    }
//
//    if (!hash_equals($hash, sha1($user->getEmailForVerification()))) {
//        abort(403, 'Invalid verification link');
//    }
//
//    $user->markEmailAsVerified();
//
//    return redirect('http://192.168.0.32:3000/'); // Redirect after verification
//})->middleware(['signed'])->name('verification.verify');

//Handling the request generated when the user clicks the email confirmation link
Route::get('/email/verify/{id}/{hash}', [VerificationController::class, 'handleVerificationLink'])
    ->middleware(['signed'])
    ->name('verification.verify');


// Resend email verification notification
Route::post('/email/verification-notification', [VerificationController::class, 'resendVerificationEmail'])
    ->middleware(['throttle:6,1']) //->middleware(['auth_jwt', 'throttle:6,1'])
    ->name('verification.send');




/*
|--------------------------------------------------------------------------
| Temporary routes
|--------------------------------------------------------------------------
*/

Route::middleware('auth_jwt')->get('/user', function (Request $request) {
//    $bearerToken = $request->bearerToken();
//    $email = $request->input('email');
//
//    $tokenPrefix = config('sanctum.token_prefix', 'SANCTUM_TOKEN');
//    $tokenParts = explode('|', $bearerToken);
//    $tokenWithoutPrefix = $tokenParts[1] ?? $bearerToken;
//
//    // Hash the token without the prefix
//    $hashedBearerToken = hash('sha256', $tokenWithoutPrefix);
//
//    // Check if the hashed token exists in the database
//    $myAuth = PersonalAccessToken::where('token', $hashedBearerToken)->first();
//    $user = User::where('email', $email)->first();
//
//    // Check if the authentication is successful
//    if (($myAuth) && ($user) && $myAuth->tokenable_id === $user->id) {
//        $authVerification = true;
//        return response()->json([
//            'authenticated' => $authVerification,
//            'user' => $user,
//            ]);
//    } else {
//        $authVerification = false;
//        return response()->json(['authenticated' => $authVerification]);
//    }
    if (Auth::user()) {
        $authVerification = true;
        return response()->json([
            'authenticated' => $authVerification,
            'user' => Auth::user(),
        ]);
    } else {
        $authVerification = false;
        return response()->json(['authenticated' => $authVerification]);
    }

});


Route::middleware('auth_jwt')->get('/jwt', function () {
    return response()->json(['authenticated' => 'user is authenticate']);
});



