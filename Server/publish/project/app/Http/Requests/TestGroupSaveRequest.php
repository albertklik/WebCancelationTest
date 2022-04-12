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
            'name' => 'required|unique:test_groups,name,'.$this->id.',id',
            'targets' => 'required|numeric|min:1',
            'distractors' => 'numeric|min:0',
            'aligned' => 'numeric|min:0|max:1',
            'target_id' => 'required|numeric',
            'time_limit' => 'numeric|min:1',
            'board' => 'json'
        ];
    }
}
