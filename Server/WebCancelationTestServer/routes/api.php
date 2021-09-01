<?php

use App\Http\Controllers\TestController;
use App\Http\Controllers\TestGroupController;
use App\Http\Controllers\StudentController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/tests/list', [TestController::class,'list'])->name('test.list');
Route::apiResource('/test', TestController::class);

Route::get('/testGroup/list', [TestGroupController::class,'list'])->name('testGroup.list');
Route::apiResource('/testGroup', TestGroupController::class);

Route::post('/student/exists', [StudentController::class,'exists'])->name('student.exists');
Route::post('/student/search', [StudentController::class,'search'])->name('student.search');
Route::apiResource('/student', StudentController::class);