<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('customer_id')->nullable(false);
            $table->foreign('customer_id')->references('id')->on('customers')->onDelete('cascade');
            $table->boolean('delivery_requirement')->default(false);
            $table->boolean('received_status')->default(false);
            $table->string('type_of_payment', 10)->default('cash');
            $table->boolean('payment_status')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
