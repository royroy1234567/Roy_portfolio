<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    // GET all categories
    public function index()
    {
        return response()->json(Category::all());
    }

    // POST create category
    public function store(Request $request)
    {
        $request->validate([
            'category_name' => 'required|unique:categories|max:50',
        ]);

        $category = Category::create($request->all());
        return response()->json($category, 201);
    }

    // GET single category
    public function show($id)
    {
        $category = Category::with('products')->findOrFail($id);
        return response()->json($category);
    }

    // PUT update category
    public function update(Request $request, $id)
    {
        $category = Category::findOrFail($id);
        $category->update($request->all());
        return response()->json($category);
    }

    // DELETE category
    public function destroy($id)
    {
        Category::destroy($id);
        return response()->json(['message' => 'Category deleted!']);
    }
}