<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\SearchController;
use App\Http\Controllers\Mail\VerificationController;
use App\Http\Controllers\UserController;
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

// Routes for the admin panel
Route::get('/admin/categories', [CategoryController::class, 'adminIndex']);
Route::get('/admin/categories/{id}', [CategoryController::class, 'adminShow']);
Route::get('/admin/products', [ProductController::class, 'adminIndex']);



Route::get('/products', [ProductController::class, 'index']);
Route::get('/products/category/{categoryId}', [ProductController::class, 'indexByCategory']);
Route::post('/products', [ProductController::class, 'store']);
Route::get('/products/{id}', [ProductController::class, 'show']);
Route::put('/products/{id}', [ProductController::class, 'update']);
Route::delete('/products/{id}', [ProductController::class, 'destroy']);

Route::get('/products/search/{search}', [SearchController::class, 'searchProducts']);


Route::middleware('auth_jwt')->post('/user', [UserController::class, 'getUserByEmail']);
Route::middleware('auth_jwt')->post('/order', [OrderController::class, 'placeOrder']);

Route::middleware('auth_jwt')->get('/customers', [CustomerController::class, 'index']);
Route::middleware('auth_jwt')->post('/customers', [CustomerController::class, 'store']);
Route::middleware('auth_jwt')->get('/customers/{id}', [CustomerController::class, 'show']);
Route::middleware('auth_jwt')->get('/customer/token', [CustomerController::class, 'showCustomer']);
Route::middleware('auth_jwt')->put('/customers/{id}', [CustomerController::class, 'update']);
Route::middleware('auth_jwt')->delete('/customers/{id}', [CustomerController::class, 'destroy']);

Route::middleware('auth_jwt')->get('/customers', [OrderController::class, 'index']); //???
Route::middleware('auth_jwt')->get('/customer/orders', [OrderController::class, 'indexForCustomer']);

Route::group(['middleware' => 'auth:sanctum'], function () {
    // Logout route
    Route::post('/logout', [AuthController::class, 'logout']);
    //Route::put('/user/password/change', [UserController::class, 'changePassword']);
    // Other authenticated routes can go here...
});
Route::middleware('auth_jwt')->put('/user/password/change', [UserController::class, 'changePassword']);


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

Route::middleware('auth_jwt')->get('/jwt', function () {
    return response()->json(['authenticated' => 'user is authenticate']);
});


/*
|--------------------------------------------------------------------------
| Route descriptions
|--------------------------------------------------------------------------
*/
// get('/customer/orders', [OrderController::class, 'indexForCustomer'] - используетс для вывода списка
// заказов текущего пользователя в личном кабинете в react процедуре <OrdersOfCustomer />

// get('/products/category/{categoryId}', [ProductController::class, 'indexByCategory'])
//

// get('/categories', [CategoryController::class, 'index']) - используется для вывода списка категорий в
// компоненте <Header/> (fetchCategories)

// get('/products/{id}', [ProductController::class, 'show']) - используется для вывода списка категорий в меню
// через react процедуру <ProductsOfCategoryPage/> (fetchCategoryData)

// get('/products/{id}', [ProductController::class, 'show']) - используется для вывода данных конкретного продукта
// при нажатии на него <ProductPage/> (getProductById(productKey))

// get('/products/search/{search}', [SearchController::class, 'searchProducts']) - используется для поска продукта
// по названию <SearchPage/> (fetchProductsBySearchParam(searchParam))

