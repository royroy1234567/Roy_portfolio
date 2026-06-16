<?php

namespace App\Http\Controllers;

use App\Models\InventoryTransaction;
use App\Models\Product;
use Illuminate\Http\Request;

class InventoryTransactionController extends Controller
{
    // GET all transactions
    public function index()
    {
        return response()->json(InventoryTransaction::with('product')->get());
    }

    // POST create transaction + update product quantity
    public function store(Request $request)
    {
        $request->validate([
            'product_id'       => 'required|exists:products,product_id',
            'transaction_type' => 'required|in:IN,OUT,ADJUST',
            'quantity'         => 'required|integer',
            'reason'           => 'nullable|string',
        ]);

        $product = Product::findOrFail($request->product_id);
        $previous_quantity = $product->quantity;

        // Compute new quantity
        if ($request->transaction_type === 'IN') {
            $new_quantity = $previous_quantity + $request->quantity;
        } elseif ($request->transaction_type === 'OUT') {
            $new_quantity = $previous_quantity - $request->quantity;
        } else {
            $new_quantity = $request->quantity; // ADJUST = set directly
        }

        // Update product quantity
        $product->update(['quantity' => $new_quantity]);

        // Save transaction
        $transaction = InventoryTransaction::create([
            'product_id'        => $request->product_id,
            'transaction_type'  => $request->transaction_type,
            'quantity'          => $request->quantity,
            'previous_quantity' => $previous_quantity,
            'new_quantity'      => $new_quantity,
            'reason'            => $request->reason,
            'transaction_date'  => now(),
        ]);

        return response()->json($transaction, 201);
    }

    // GET single transaction
    public function show($id)
    {
        return response()->json(InventoryTransaction::with('product')->findOrFail($id));
    }
}