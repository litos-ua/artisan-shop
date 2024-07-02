<?php

namespace App\Http\Controllers;

use App\Http\Resources\CategoryResource;
use App\Models\Category;
use Exception;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class CategoryController extends Controller
{
    /**
     * Display a listing of the categories.
     */
    public function index()
    {
        try {
            $categories = Category::all();
            $categoriesResponse = CategoryResource::collection($categories);
            $categoriesResponse->wrap('categories');

            return $categoriesResponse
                ->response()
                ->header('Access-Control-Allow-Origin', '*')
                ->header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS')
                ->header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        } catch (Exception $e) {
            Log::error('Error in index method', [
                'exception' => $e,
            ]);
            return response()->json(['error' => 'Unable to fetch categories'], 500);
        }
    }

    public function adminIndex(Request $request)
    {
        try {
            // Paginate the categories
            $perPage = $request->input('perPage', 5);
            //$perPage = 6;
            $categories = Category::paginate($perPage);

            // Get the total count for the X-Total-Count header
            $total = $categories->total();
            $categoriesItems = $categories->items();

            return response()->json($categoriesItems)
                ->header('X-Total-Count', $total)
                ->header('Access-Control-Allow-Origin', '*')
                ->header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS')
                ->header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
                ->header('Access-Control-Expose-Headers', 'X-Total-Count');
        } catch (Exception $e) {
            Log::error('Error in adminIndex method', [
                'exception' => $e,
                'request' => $request->all(),
            ]);
            return response()->json(['error' => 'Unable to fetch categories'], 500);
        }
    }

    /**
     * Store a newly created category in storage.
     */
    public function store(Request $request)
    {
        // Logic to create a new category
    }

    public function adminStore(Request $request)
    {
        try {
            $request->validate(['name' => 'required|string|max:255']);
            $category = Category::create($request->only('name'));

            return response()->json(['data' => $category], 201)
                ->header('Access-Control-Allow-Origin', '*')
                ->header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS')
                ->header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        } catch (Exception $e) {
            Log::error('Error in adminStore method', [
                'exception' => $e,
                'request' => $request->all(),
            ]);
            return response()->json(['error' => 'Unable to create category'], 500);
        }
    }

    /**
     * Display the specified category.
     */
    public function show(string $id)
    {
        try {
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
        } catch (Exception $e) {
            Log::error('Error in show method', [
                'exception' => $e,
                'category_id' => $id,
            ]);
            return response()->json(['error' => 'Unable to fetch category'], 500);
        }
    }

    public function adminShow($id)
    {
        try {
            $category = Category::findOrFail($id);
            return response()->json([
                'data' => $category,
            ], 200);
        } catch (ModelNotFoundException $e) {
            Log::error('Category not found in adminShow method', [
                'exception' => $e,
                'category_id' => $id,
            ]);
            return response()->json(['error' => 'Category not found'], 404);
        } catch (Exception $e) {
            Log::error('Error in adminShow method', [
                'exception' => $e,
                'category_id' => $id,
            ]);
            return response()->json(['error' => 'An error occurred'], 500);
        }
    }

    /**
     * Update the specified category in storage.
     */
    public function update(Request $request, string $id)
    {
        // Logic to update a category
    }

    public function adminUpdate(Request $request, string $id)
    {
        try {
            $request->validate(['name' => 'required|string|max:255']);
            $category = Category::findOrFail($id);
            $category->update($request->only('name'));

            return response()->json(['data' => $category], 200)
                ->header('Access-Control-Allow-Origin', '*')
                ->header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS')
                ->header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        } catch (ModelNotFoundException $e) {
            Log::error('Category not found in adminUpdate method', [
                'exception' => $e,
                'category_id' => $id,
            ]);
            return response()->json(['error' => 'Category not found'], 404);
        } catch (Exception $e) {
            Log::error('Error in adminUpdate method', [
                'exception' => $e,
                'request' => $request->all(),
                'category_id' => $id,
            ]);
            return response()->json(['error' => 'Unable to update category'], 500);
        }
    }

    /**
     * Remove the specified category from storage.
     */
    public function destroy(string $id)
    {
        // Logic to delete a category
    }

    public function adminDestroy(string $id)
    {
        try {
            $category = Category::findOrFail($id);
            $category->delete();

            return response()->json(null, 204)
                ->header('Access-Control-Allow-Origin', '*')
                ->header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS')
                ->header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        } catch (ModelNotFoundException $e) {
            Log::error('Category not found in adminDestroy method', [
                'exception' => $e,
                'category_id' => $id,
            ]);
            return response()->json(['error' => 'Category not found'], 404);
        } catch (Exception $e) {
            Log::error('Error in adminDestroy method', [
                'exception' => $e,
                'category_id' => $id,
            ]);
            return response()->json(['error' => 'Unable to delete category'], 500);
        }
    }
}


//namespace App\Http\Controllers;
//
//use App\Http\Resources\CategoryResource;
//use App\Models\Category;
//use Exception;
//use Illuminate\Database\Eloquent\ModelNotFoundException;
//use Illuminate\Http\Request;
//
//class CategoryController extends Controller
//{
//    /**
//     * Display a listing of the categories.
//     */
//    public function index()
//    {
//        $categories = Category::all();
//        $categoriesResponce = CategoryResource::collection($categories);
//        $categoriesResponce->wrap ('categories');
//        $stop = 1;
//        return $categoriesResponce       //CategoryResource::collection($categories)
//            ->response()
//            ->header('Access-Control-Allow-Origin', '*')
//            ->header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS')
//            ->header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//    }
//
//
//    public function adminIndex(Request $request)
//    {
//        // Paginate the categories
//        $perPage = $request->input('perPage', 5);
//        $categories = Category::paginate($perPage);
//
//        // Get the total count for the X-Total-Count header
//        $total = $categories->total();
//        $categoriesItems = $categories->items();
//
//        return response()->json(
//            $categoriesItems,
//        )
//            ->header('X-Total-Count', $total)
//            ->header('Access-Control-Allow-Origin', '*')
//            ->header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS')
//            ->header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
//            ->header('Access-Control-Expose-Headers', 'X-Total-Count');
//    }
//
//
//    /**
//     * Store a newly created category in storage.
//     */
//    public function store(Request $request)
//    {
//        // Logic to create a new category
//    }
//
//    public function adminStore(Request $request)
//    {
//        $request->validate(['name' => 'required|string|max:255']);
//        $category = Category::create($request->only('name'));
//
//        return response()->json(['data' => $category], 201)
//            ->header('Access-Control-Allow-Origin', '*')
//            ->header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS')
//            ->header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//    }
//
//
//
//    /**
//     * Display the specified category.
//     */
//    public function show(string $id)
//    {
//        $category = Category::find($id);
//
//        if (!$category) {
//            return response()->json(['error' => 'Category not found'], 404)
//                ->header('Access-Control-Allow-Origin', '*')
//                ->header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS')
//                ->header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//        }
//
//        return response()->json(['category' => $category], 200)
//            ->header('Access-Control-Allow-Origin', '*')
//            ->header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS')
//            ->header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//    }
//
//    public function adminShow($id)
//    {
//        try {
//            $category = Category::findOrFail($id);
//            return response()->json([
//                'data' => $category,
//            ], 200);
//        } catch (ModelNotFoundException $e) {
//            return response()->json([
//                'error' => 'Category not found',
//            ], 404);
//        } catch (Exception $e) {
//            return response()->json([
//                'error' => 'An error occurred',
//            ], 500);
//        }
//    }
//
//
//    /**
//     * Update the specified category in storage.
//     */
//    public function update(Request $request, string $id)
//    {
//        // Logic to update a category
//    }
//
//    public function adminUpdate(Request $request, string $id)
//    {
//        $request->validate(['name' => 'required|string|max:255']);
//        $category = Category::findOrFail($id);
//        $category->update($request->only('name'));
//
//        return response()->json(['data' => $category], 200)
//            ->header('Access-Control-Allow-Origin', '*')
//            ->header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS')
//            ->header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//    }
//
//    /**
//     * Remove the specified category from storage.
//     */
//    public function destroy(string $id)
//    {
//        // Logic to delete a category
//    }
//
//    public function adminDestroy(string $id)
//    {
//        $category = Category::findOrFail($id);
//        $category->delete();
//
//        return response()->json(null, 204)
//            ->header('Access-Control-Allow-Origin', '*')
//            ->header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS')
//            ->header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//    }
//}
