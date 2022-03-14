<?php

namespace App\Http\Controllers;

use App\Http\Requests\ResearchFilterRequest;
use App\Http\Requests\ResearchSaveRequest;
use App\Models\Researches;

class ResearchController extends Controller
{
    public function index() 
    {
        $researches = Researches::all();
        return response()->json($researches);
    }

    public function list(ResearchFilterRequest $request) {
        $ifRequest = array();
        // if ($request->has('filter_id')) {
        //     $ifRequest[] = ['filter_id','=',$request->input('filter_id')];
        // }
        $researches = Researches::where($ifRequest)->withCount('testGroups')->orderByDesc('created_at')->paginate($request->input('elements_per_pag'));
        return response()->json($researches);
    }

    public function show($id) 
    {
        return Researches::findOrFail($id);
    }

    public function store(ResearchSaveRequest $request) 
    {
        $researches = new Researches();
        $researches->fill($request->all());
        $researches->save();

        return response()->json($researches);
    }

    public function update(ResearchSaveRequest $request, $id) {

        $researches = Researches::findOrFail($id);

        $researches->fill($request->all());
        $researches->save();

        return response()->json($researches);
    }

    public function destroy($id) 
    {
        $researches = Researches::findOrFail($id);

        if ($researches->delete()) 
        {
            return response()->json($researches);
        }
    }
}
