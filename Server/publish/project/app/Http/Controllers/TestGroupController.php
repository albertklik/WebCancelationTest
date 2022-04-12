<?php

namespace App\Http\Controllers;

use App\Http\Requests\TestGroupFilterRequest;
use App\Http\Requests\TestGroupSaveRequest;
use App\Models\TestGroup;

class TestGroupController extends Controller
{
    public function index() 
    {
        $testGroups = TestGroup::all();
        return response()->json($testGroups);
    }

    public function list(TestGroupFilterRequest $request) {
        $ifRequest = array();
        if ($request->has('research_id')) {
            $ifRequest[] = ['researches_id','=',$request->input('research_id')];
        }
        $tests = TestGroup::where($ifRequest)->withCount('tests')->orderByDesc('created_at')->paginate($request->input('elements_per_pag'));
        return response()->json($tests);
    }

    public function show($id) 
    {
        return TestGroup::findOrFail($id);
    }

    public function store(TestGroupSaveRequest $request) 
    {
        $testGroup = new TestGroup();
        $testGroup->fill($request->all());
        $testGroup->save();

        return response()->json($testGroup);
    }

    public function update(TestGroupSaveRequest $request, $id) {

        $testGroup = TestGroup::findOrFail($id);

        $testGroup->fill($request->all());
        $testGroup->save();

        return response()->json($testGroup);
    }

    public function destroy($id) 
    {
        $testGroup = TestGroup::findOrFail($id);

        if ($testGroup->delete()) 
        {
            return response()->json($testGroup);
        }
    }
}
