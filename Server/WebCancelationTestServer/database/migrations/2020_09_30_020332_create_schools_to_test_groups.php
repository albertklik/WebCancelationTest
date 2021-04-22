<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSchoolsToTestGroups extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        // Schema::table('test_groups', function (Blueprint $table) {
        //     $table->foreignId("schools_id")
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
        // Schema::table('test_groups', function (Blueprint $table) {
        //     $table->dropForeign(["schools_id"]);
        // });
    }
}
