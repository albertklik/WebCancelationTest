<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class TestFilterRequest extends FormRequest
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
            'pag' => 'required|numeric',
            'elements_per_pag' => 'required|numeric',
            'test_group_id' => 'numeric',
            'student_id' => 'numeric'
        ];
    }

    public function messages()
    {
        return [
            'pag.required' => 'Numero da página é obrigatório',
            'pag.numeric' => 'O campo Numero da página precisa ser um número válido',
            'elements_per_pag.required' => 'Elementos por página é obrigatório',
            'elements_per_pag.numeric' => 'O campo elementos por página precisa ser um número válido',
            'test_group_id.numeric' => 'O campo test_group_id precisa ser um número válido',
            'student_id.numeric' => 'O campo student_id precisa ser um número válido',
        ];
    }
}
