<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class TestSaveRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'result' => 'required|json',
            'seconds' => 'required|numeric|min:0',
            'hits' => 'required|numeric|min:0',
            'misses' => 'required|numeric|min:0',
            'student_id' => 'required|numeric|min:0',
            'test_group_id' => 'required|numeric|min:0',
            'board' => 'required|json'
        ];
    }
}
