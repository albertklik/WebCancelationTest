<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class TestGroupSaveRequest extends FormRequest
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
            'name' => 'required|unique:test_groups|string',
            'aligned' => 'required|numeric|min:0|max:1',
            'target_id' => 'required|numeric|min:0',
            'targets' => 'required|numeric|min:0',
            'distractors' => 'required|numeric|min:0',
            'time_limit' => 'numeric|min:0'
        ];
    }
}
