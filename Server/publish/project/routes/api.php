<?php

use App\Http\Controllers\ResearchController;
use App\Http\Controllers\TestController;
use App\Http\Controllers\TestGroupController;
use App\Http\Controllers\StudentController;
use App\Models\Researches;
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

Route::get('/test/list', [TestController::class,'list'])->name('test.list');
Route::post('/test/update/{test}', [TestController::class,'update'])->name('test.update');
Route::post('/test/delete/{test}', [TestController::class,'destroy'])->name('test.delete');
Route::apiResource('/test', TestController::class);

Route::get('/testGroup/list', [TestGroupController::class,'list'])->name('testGroup.list');
Route::post('/testGroup/update/{testGroup}', [TestGroupController::class,'update'])->name('testGroup.update');
Route::post('/testGroup/delete/{testGroup}', [TestGroupController::class,'destroy'])->name('testGroup.delete');
Route::apiResource('/testGroup', TestGroupController::class);

Route::get('/research/list', [ResearchController::class,'list'])->name('research.list');
Route::post('/research/update/{research}', [ResearchController::class,'update'])->name('research.update');
Route::post('/research/delete/{research}', [ResearchController::class,'destroy'])->name('research.delete');
Route::apiResource('/research', ResearchController::class);

Route::post('/student/exists', [StudentController::class,'exists'])->name('student.exists');
Route::post('/student/search', [StudentController::class,'search'])->name('student.search');
Route::apiResource('/student', StudentController::class);