<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TestGroup extends Model
{
    use HasFactory;

    protected $fillable = [
        'name', 
        'blocks', 
        'targets',
        'distractors',
        'aligned',
        'target_id',
        'time_limit',
        'board',
        'researches_id'
    ];

    public function tests() {
        return $this->hasMany(Test::class);
    }
    
}
