<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Test extends Model
{
    protected $fillable = [
        'result',
        'seconds',
        'hits',
        'misses',
        'student_id',
        'test_group_id'
    ];
    use HasFactory;

    public function student() {
        return $this->belongsTo('App\Models\Students');
    }

    public function testGroup() {
        return $this->belongsTo('App\Models\TestGroups');
    }
}
