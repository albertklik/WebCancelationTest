<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class TestGroupFilterRequest extends FormRequest
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
            'pag' => 'required|numeric|min:0',
            'elements_per_pag' => 'required|numeric|min:0',
            'research_id' => 'numeric|min:0',
        ];
    }

    public function messages()
    {
        return [
            'pag.required' => 'Numero da página é obrigatório',
            'pag.numeric' => 'O campo Numero da página precisa ser um número válido',
            'elements_per_pag.required' => 'Elementos por página é obrigatório',
            'elements_per_pag.numeric' => 'O campo elementos por página precisa ser um número válido',
            'research_id.numeric' => 'O campo research_id precisa ser um número válido',
        ];
    }
}
