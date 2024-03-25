<?php

namespace App\Http\Controllers;

use App\Http\Resources\CategoryResource;
use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    /**
     * Display a listing of the categories.
     */
    public function index()
    {
        $categories = Category::all();
//        return response()->json(['categories' => $categories], 200)
        $categoriesResponce = CategoryResource::collection($categories);
        $categoriesResponce->wrap ('categories');
        $stop = 1;
        return $categoriesResponce       //CategoryResource::collection($categories)
            ->response()
            ->header('Access-Control-Allow-Origin', '*')
            ->header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS')
            ->header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    }



    /**
     * Store a newly created category in storage.
     */
    public function store(Request $request)
    {
        // Logic to create a new category
    }

    /**
     * Display the specified category.
     */
    public function show(string $id)
    {
        $category = Category::find($id);

        if (!$category) {
            return response()->json(['error' => 'Category not found'], 404)
                ->header('Access-Control-Allow-Origin', '*')
                ->header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS')
                ->header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        }

        return response()->json(['category' => $category], 200)
            ->header('Access-Control-Allow-Origin', '*')
            ->header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS')
            ->header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    }

    /**
     * Update the specified category in storage.
     */
    public function update(Request $request, string $id)
    {
        // Logic to update a category
    }

    /**
     * Remove the specified category from storage.
     */
    public function destroy(string $id)
    {
        // Logic to delete a category
    }
}
