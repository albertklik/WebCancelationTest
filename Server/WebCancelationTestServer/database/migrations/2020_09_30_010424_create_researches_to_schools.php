<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateResearchesToSchools extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        // Schema::table('schools', function (Blueprint $table) {
        //     $table->foreignId("researches_id")
        //             ->constrained()
        //             ->cascadeOnDelete();
        // });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        // Schema::table('schools', function (Blueprint $table) {
        //     $table->dropForeign(["researches_id"]);
        // });
    }
}
