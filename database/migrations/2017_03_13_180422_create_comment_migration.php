<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCommentMigration extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
     public function up()
     {
         Schema::create('comments', function (Blueprint $table) {
            $table->increments('id');
            $table->string('content')->index();
            $table->int('type')->default('0');
            $table->integer('creator_id')->unsigned()->default('0');
            $table->integer('parent_id')->index()->default('0');
            $table->timestamps();

            $table->foreign('creator_id')->references('id')->on('users')->onDelete('cascade');
         });
     }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
      
    }
}
