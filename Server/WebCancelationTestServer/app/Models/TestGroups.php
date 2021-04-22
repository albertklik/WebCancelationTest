<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TestGroups extends Model
{
    use HasFactory;

    protected $fillable = [
        'name', 
        'blocks', 
        'targets',
        'distractors',
        'aligned',
        'target_id',
    ];

    public function tests()
    {
        return $this->hasMany(Tests::class);
    }
    
}
