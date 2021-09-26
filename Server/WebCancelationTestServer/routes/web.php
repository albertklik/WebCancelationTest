<?php

use App\Http\Controllers\langController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ViewController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', [ViewController::class,'index']);
Route::get('/login', [ViewController::class,'index'])->name('login');
Route::get('/cancellationTest', [ViewController::class,'test'])->name('doTheTest');
Route::get('/home', [ViewController::class,'home'])->name('home');
Route::get('/publicHome', [ViewController::class,'publicHome'])->name('homePage');
Route::get('/testGroups', [ViewController::class,'testGroups'])->name('testGroups');
Route::get('/changeLang', [langController::class,'change'])->name('changeLang');

