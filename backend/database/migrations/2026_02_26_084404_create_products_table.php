<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id('product_id');
            $table->string('product_name', 100);
            $table->foreignId('category_id')->constrained('categories', 'category_id')
                ->onDelete('restrict')
                ->onUpdate('cascade');
            $table->decimal('price', 10, 2);
            $table->integer('quantity')->default(0);
            $table->string('sku', 50)->unique()->nullable();
            $table->text('description')->nullable();
            $table->string('image_url', 255)->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};