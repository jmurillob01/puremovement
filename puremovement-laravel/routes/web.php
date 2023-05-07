<?php

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

Route::resource('user', UserController::class);

Route::get('viewAccessUser', [UserController::class, 'viewAccessUser'])->name('user.viewAccessUser'); // Ruta para la función de ese método

Route::post('checkUserLogin', [UserController::class, 'checkUserLogin'])->name('user.checkUserLogin');

// Esto no lo hará porque se queda en el post
// Route::get('/checkUserLogin', function () {
//     return view('access_register');
// });