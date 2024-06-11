<?php

namespace App\Http\Controllers;

use App\Http\Resources\CategoryResource;
use App\Models\Category;
use Exception;
use Illuminate\Database\Eloquent\ModelNotFoundException;
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


    public function adminIndex(Request $request)
    {
        // Paginate the categories
        $perPage = $request->input('perPage', 5); // Default to 10 per page if not specified
        $categories = Category::paginate($perPage);

        // Get the total count for the X-Total-Count header
        $total = $categories->total();
        $categoriesItems = $categories->items();

        return response()->json(
            $categoriesItems,
        )
            ->header('X-Total-Count', $total)
            ->header('Access-Control-Allow-Origin', '*')
            ->header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS')
            ->header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
            ->header('Access-Control-Expose-Headers', 'X-Total-Count');
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

    public function adminShow($id)
    {
        try {
            // Fetch the category by ID
            $category = Category::findOrFail($id);

            // Return the category as a JSON response
            return response()->json([
                'data' => $category,
            ], 200);
        } catch (ModelNotFoundException $e) {
            // Handle the case where the category is not found
            return response()->json([
                'error' => 'Category not found',
            ], 404);
        } catch (Exception $e) {
            // Handle any other exceptions
            return response()->json([
                'error' => 'An error occurred',
            ], 500);
        }
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
