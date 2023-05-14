<?php

use App\Http\Controllers\IngredientController;
use App\Http\Controllers\RecipeController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

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
    return view('principal');
});

Route::get('/user-register', function () {
    return view('access_register');
});

Route::get('/user-login', function () {
    return view('access_login');
});

Route::get('/account_createRecipes', function () {
    return view('account_createRecipes');
});

Route::get('/account_createIngredients', function () {
    return view('account_createIngredients');
});

Route::resource('user', UserController::class);
Route::resource('recipe', RecipeController::class);
Route::resource('ingredient', IngredientController::class);

Route::get('viewAccessUserRegister', [UserController::class, 'viewAccessUserRegister'])->name('user.viewAccessUserRegister'); // Ruta para la función de ese método
Route::get('viewAccessUserLogin', [UserController::class, 'viewAccessUserLogin'])->name('user.viewAccessUserLogin'); // Ruta para la función de ese método

// No sé porque tenía esto, dejo por si acaso
// Route::get('createIngredients', [IngredientController::class, 'account_createIngredients'])->name('ingredients.account_createIngredients'); // Ruta para la función de ese método
Route::get('account_createIngredients', [IngredientController::class, 'account_createIngredients'])->name('ingredients.account_createIngredients');

Route::post('/searchIngredient', [IngredientController::class, 'indexIngredientsLike'])->name('ingredients.indexIngredientsLike');

Route::post('checkUserLogin', [UserController::class, 'checkUserLogin'])->name('user.checkUserLogin');

// Esto no lo hará porque se queda en el post
// Route::get('/checkUserLogin', function () {
//     return view('access_register');
// });