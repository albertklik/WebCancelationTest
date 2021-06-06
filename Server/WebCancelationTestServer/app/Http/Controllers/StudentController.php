<?php

namespace App\Http\Controllers;

use App\Http\Requests\StudentSaveRequest;
use App\Http\Requests\StudentSearchRequest;
use App\Models\Student;

class StudentController extends Controller
{
    public function index() 
    {
        $students = Student::all();
        return response()->json($students);
    }

    public function show($id) 
    {
        return Student::findOrFail($id);
    }

    public function search(StudentSearchRequest $request) {
       $students = Student::where('name','LIKE','%'.$request->input('name').'%')->get();
       return response()->json($students);
    }

    public function store(StudentSaveRequest $request) 
    {
        $student = new Student();
        $student->fill($request->all());
        $student->save();

        return response()->json($student);
    }

    public function update(StudentSaveRequest $request, $id) {

        $student = Student::findOrFail($id);

        $student->fill($request->all());
        $student->save();

        return response()->json($student);
    }

    public function destroy($id) 
    {
        $student = Student::findOrFail($id);

        if ($student->delete()) 
        {
            return response()->json($student);
        }
    }
}
