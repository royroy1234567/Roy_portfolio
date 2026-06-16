<?php
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;
use App\Models\User;

Route::get('/', function () {
    return view('welcome');
});


Route::get('/api/users', function () {
    return response()->json(User::all());
});


Route::get('/api/users', [UserController::class, 'index']);