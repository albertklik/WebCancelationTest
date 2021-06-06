<?php

namespace App\Http\Controllers;

use App\Http\Requests\CancellationTestRequest;
use App\Models\TestGroup;
use Illuminate\Http\Request;

class ViewController extends Controller
{
    public function index() {
        return view('welcome');
    }

    public function test(CancellationTestRequest $request) {
        $testGroup = TestGroup::findOrFail($request->input('id'));
        return view('cancellationTest',['testGroup' => $request]);
    }
}
