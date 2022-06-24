<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Student extends Model
{
    protected $fillable = ['name','birth_date'
    //,'class_name','grade','shift','responsible_name','phone'
];
    use HasFactory;

    public function tests() {
        return $this->hasMany(Test::class);
    }
}
