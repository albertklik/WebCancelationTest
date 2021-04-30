<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Tests;
class TestsController extends Controller
{
    public function show($id) {
        return Tests::findOrFail($id);
    }
}
