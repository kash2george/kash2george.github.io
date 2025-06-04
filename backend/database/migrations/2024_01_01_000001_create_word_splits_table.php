<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('word_splits', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->string('word');
            $table->string('part1');
            $table->string('part2')->nullable();
            $table->string('part3');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('word_splits');
    }
};
