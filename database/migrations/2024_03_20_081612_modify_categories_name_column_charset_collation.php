<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{

    public function up(): void
    {
        Schema::table('categories', function (Blueprint $table) {
            $table->string('name')
                ->charset('utf8mb4')
                ->collation('utf8mb4_unicode_ci')
                ->change();
        });
    }


    public function down(): void
    {
        Schema::table('categories', function (Blueprint $table) {
            $table->string('name')
                ->charset('utf8')
                ->collation('utf8_general_ci')->change();
        });
    }
};
