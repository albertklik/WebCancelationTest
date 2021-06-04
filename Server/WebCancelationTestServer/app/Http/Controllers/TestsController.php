<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Test;
use App\Http\Requests\TestSaveRequest;
class TestsController extends Controller
{
    public function index() 
    {
        $tests = Test::all();
        return response()->json($tests);
    }

    public function show($id) 
    {
        return Test::findOrFail($id);
    }

    public function store(TestSaveRequest $request) 
    {
        $test = new Test();
        $test->fill($request->all());
        $test->save();

        return response()->json($test, 201);
    }

    public function update(TestSaveRequest $request, $id) {

        $test = Test::findOrFail($id);

        $test->fill($request->all());
        $test->save();

        return response()->json($test);
    }

    public function destroy($id) 
    {
        $test = Test::findOrFail($id);

        if ($test->delete()) 
        {
            return response()->json($test);
        }
    }
}
