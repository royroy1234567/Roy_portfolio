<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    protected $primaryKey = 'category_id';

    protected $fillable = [
        'category_name',
        'description',
        'is_default',
    ];

    // Relationship — Category has many Products
    public function products()
    {
        return $this->hasMany(Product::class, 'category_id', 'category_id');
    }
}