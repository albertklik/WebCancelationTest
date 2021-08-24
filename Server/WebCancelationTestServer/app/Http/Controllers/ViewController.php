<?php

namespace App\Http\Controllers;

use App\Http\Requests\CancellationTestRequest;
use App\Models\TestGroup;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;

class ViewController extends Controller
{
    public function index() {
        return view('welcome');
    }

    public function test(CancellationTestRequest $request) {
        App::setLocale('fr');
        $testGroup = TestGroup::findOrFail($request->input('id'));
        return view('cancellationTest',['testGroup' => $testGroup]);
    }

    public function login() {

    }

    public function home() {
       App::setLocale('pt');
       return view('testGroups');
    }

    public function publicHome() {

    }

    public function searches() {
        
    }

    
}
