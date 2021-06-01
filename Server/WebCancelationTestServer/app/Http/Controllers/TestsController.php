<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Tests;
class TestsController extends Controller
{
    public function index() 
    {
        $tests = Tests::all();
        return response()->json($tests);
    }

    public function show($id) 
    {
        return Tests::findOrFail($id);
    }

    public function store(Request $request) 
    {
        $validated = $request->validate(Tests::getValidationArray());
        
        $test = new Tests();
        $test->fill($request->all());
        $test->save();

        return response()->json($test, 201);
    }

    public function update(Request $request, $id) {

        $test = Tests::findOrFail($id);

        $validated = $request->validate(Tests::getValidationArray());

        $test->fill($request->all());
        $test->save();

        return response()->json($test);
    }

    public function destroy($id) 
    {
        $test = Tests::findOrFail($id);

        if ($test->delete()) 
        {
            return response()->json($test);
        }
    }
}
