<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Test;
use App\Http\Requests\TestSaveRequest;
use App\Http\Requests\TestFilterRequest;
class TestController extends Controller
{
    public function index() 
    {
        $tests = Test::all();
        return response()->json($tests);
    }

    public function list(TestFilterRequest $request) {
        $ifRequest = array();
        if ($request->has('test_group_id')) {
            $ifRequest[] = ['test_group_id','=',$request->input('test_group_id')];
        }
        if ($request->has('student_id')) {
            $ifRequest[] = ['student_id','=',$request->input('student_id')];
        }
        $tests = Test::where($ifRequest)->orderByDesc('created_at')->paginate($request->input('elements_per_pag'));
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

        return response()->json($test);
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
