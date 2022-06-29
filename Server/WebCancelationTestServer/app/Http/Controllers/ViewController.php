<?php

namespace App\Http\Controllers;

use App\Http\Requests\CancellationTestRequest;
use App\Models\TestGroup;
use App\Models\Researches;
use App\Models\Test;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;

class ViewController extends Controller
{
    public function __construct()
    {
        if (session()->get('locale') === null) {
            session()->put('locale', 'en');
        }

        
    }

    private function checkLang($req) {
        if ($req->has('lang')) {
            App::setLocale($req->lang);
            session()->put('locale', $req->lang);
        }
    }

    public function index() {
        return view('welcome');
    }

    public function test(CancellationTestRequest $request) {
        $this->checkLang($request);
        $testGroup = TestGroup::findOrFail($request->input('id'));
        return view('cancellationTest',['testGroup' => $testGroup]);
    }

    public function login() {

    }

    public function publicHome(Request $request) {
       return view('publicHome');
    }

    public function home() {
        $counts = array();
        $counts['researches'] = Researches::count();
        $counts['testGroups'] = TestGroup::count();
        $counts['tests'] = Test::count();
       return view('home',['counts' => $counts]);
    }

    public function testGroups(Request $request) {
        $research = Researches::findOrFail($request->input('research_id'));
        return view('testGroups',['research' => $research]);
    }

    public function tests(Request $request) {
        $testGroup = TestGroup::findOrFail($request->input('testGroup_id'));
        return view('tests',['testGroup' => $testGroup]);
    }

    public function testResult(Request $request) {
        $test = Test::findOrFail($request->input('test_id'));
        return view('testResult',['test' => $test]);
    }

    public function researches() {
        return view('researches');
    }

    public function searches() {
        
    }

    
}
