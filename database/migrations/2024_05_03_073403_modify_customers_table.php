<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('customers', function (Blueprint $table) {
            $table->string('last_name', 100)->nullable()->change();
            $table->string('phone_number', 20)->nullable()->change();
            $table->string('zip_code', 10)->nullable()->change();
            $table->text('address')->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('customers', function (Blueprint $table) {
            $table->string('last_name', 100)->nullable(false)->change();
            $table->string('phone_number', 20)->nullable(false)->change();
            $table->string('zip_code', 10)->nullable(false)->change();
            $table->text('address')->nullable(false)->change();
        });
    }
};
