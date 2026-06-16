<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    // GET all products with category
    public function index()
    {
        return response()->json(Product::with('category')->get());
    }

    // POST create product
    public function store(Request $request)
    {
        $request->validate([
            'product_name' => 'required|max:100',
            'category_id'  => 'required|exists:categories,category_id',
            'price'        => 'required|numeric|min:0',
            'quantity'     => 'required|integer|min:0',
        ]);

        $product = Product::create($request->all());
        return response()->json($product, 201);
    }

    // GET single product
    public function show($id)
    {
        $product = Product::with('category', 'transactions')->findOrFail($id);
        return response()->json($product);
    }

    // PUT update product
    public function update(Request $request, $id)
    {
        $product = Product::findOrFail($id);
        $product->update($request->all());
        return response()->json($product);
    }

    // DELETE product
    public function destroy($id)
    {
        Product::destroy($id);
        return response()->json(['message' => 'Product deleted!']);
    }
}