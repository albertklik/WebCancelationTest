<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Researches extends Model
{
    protected $fillable = ['title','description','keywords','instructor_name'];
    use HasFactory;

    /**
     *  get the user associated with the research
     */

    //  public function user()
    //  {
    //      return $this->belongsTo(Users::class);
    //  }

    /**
     * get the schools of the research.
     */

    // public function schools()
    // {
    //     return $this->hasMany(Schools::class);
    // }

    /**
     * get the thest groups of the reseach
     */

    public function testGroups()
    {
        return $this->hasMany(TestGroups::class);
    }
}
