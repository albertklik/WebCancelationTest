<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tests extends Model
{
    protected $fillable = ['result','seconds','hits','misses','students_id','test_groups_id'];
    use HasFactory;

    public static function getValidationArray() {
        return [
            'result' => 'required|json',
            'seconds' => 'required|numeric',
            'hits' => 'required|numeric',
            'misses' => 'required|numeric',
            'students_id' => 'required|numeric',
            'test_groups_id' => 'required|numeric'
        ];
    }
}
