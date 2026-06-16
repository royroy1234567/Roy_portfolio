<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $primaryKey = 'product_id';

    protected $fillable = [
        'product_name',
        'category_id',
        'price',
        'quantity',
        'sku',
        'description',
        'image_url',
    ];

    // Relationship — Product belongs to Category
    public function category()
    {
        return $this->belongsTo(Category::class, 'category_id', 'category_id');
    }

    // Relationship — Product has many Transactions
    public function transactions()
    {
        return $this->hasMany(InventoryTransaction::class, 'product_id', 'product_id');
    }
}