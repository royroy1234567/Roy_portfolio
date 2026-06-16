<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class InventoryTransaction extends Model
{
    protected $primaryKey = 'transaction_id';

    protected $fillable = [
        'product_id',
        'transaction_type',
        'quantity',
        'previous_quantity',
        'new_quantity',
        'reason',
        'transaction_date',
    ];

    // Relationship — Transaction belongs to Product
    public function product()
    {
        return $this->belongsTo(Product::class, 'product_id', 'product_id');
    }
}