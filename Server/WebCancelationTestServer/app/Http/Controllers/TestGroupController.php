<?php

namespace App\Http\Controllers;

use App\Http\Requests\TestGroupSaveRequest;
use App\Models\TestGroup;

class TestGroupController extends Controller
{
    public function index() 
    {
        $testGroups = TestGroup::all();
        return response()->json($testGroups);
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
