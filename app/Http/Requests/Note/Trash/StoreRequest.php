<?php

namespace App\Http\Requests\Note\Trash;

use Illuminate\Foundation\Http\FormRequest;

class StoreRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'title' => [ 'string', 'max:255', 'nullable' ], 
            'text' => [ 'string', 'max:4294967295', 'nullable' ], 
        ];
    }
}
