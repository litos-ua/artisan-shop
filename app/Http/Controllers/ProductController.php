<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProductResource;
use App\Models\Product;
use Illuminate\Http\Request;
use Exception;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class ProductController extends Controller
{

    public function index()
    {
        $products = Product::all();
        $productsResponce = ProductResource::collection($products);
        $productsResponce->wrap ('products');
        return $productsResponce->response();
    }


//    public function adminIndex(Request $request)
//    {
//        $start = $request->input('_start', 0);
//        $end = $request->input('_end', 5);
//        $perPage = $end - $start;
//        $page = ($start / $perPage) + 1;
//
//        $sortField = $request->input('_sort', 'id');
//        $sortOrder = $request->input('_order', 'ASC');
//
//        $query = Product::with('category')
//            ->orderBy($sortField, $sortOrder);
//
//        $products = $query->paginate($perPage, ['*'], 'page', $page);
//        $total = $products->total();
//
//        return response()->json($products->items())
//            ->header('X-Total-Count', $total)
//            ->header('Access-Control-Allow-Origin', '*')
//            ->header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS')
//            ->header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
//            ->header('Access-Control-Expose-Headers', 'X-Total-Count');
//    }

    public function adminIndex(Request $request)
    {
        $page = $request->input('_page', 1);
        $perPage = $request->input('_limit', 5);

        $sortField = $request->input('_sort', 'id');
        $sortOrder = $request->input('_order', 'ASC');

        $query = Product::with('category')
            ->orderBy($sortField, $sortOrder);

        $products = $query->paginate($perPage, ['*'], 'page', $page);
        $total = $products->total();

        return response()->json($products->items())
            ->header('X-Total-Count', $total)
            ->header('Access-Control-Allow-Origin', '*')
            ->header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS')
            ->header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
            ->header('Access-Control-Expose-Headers', 'X-Total-Count');
    }



//    public function adminIndex(Request $request)
//    {
//        $page = $request->input('_page', 1);
//        $perPage = $request->input('_limit', 5);
//
//        $sortField = $request->input('_sort', 'id');
//        $sortOrder = $request->input('_order', 'ASC');
//
//        $query = Product::with('category')
//            ->orderBy($sortField, $sortOrder);
//
//        $products = $query->paginate($perPage, ['*'], 'page', $page);
//        $total = $products->total();
//
//        return response()->json([
//            'data' => $products->items(),
//            'total' => $total
//        ])
//            ->header('X-Total-Count', $total)
//            ->header('Access-Control-Allow-Origin', '*')
//            ->header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS')
//            ->header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
//            ->header('Access-Control-Expose-Headers', 'X-Total-Count');
//    }


    public function indexByCategory($categoryId)
    {
        $products = Product::where('category_id', $categoryId)->get();
        $productsOfCategory = ProductResource::collection($products);
//        $productsOfCategory->wrap('productsByCategory');
        $wrapperName = "productsByCategory_" . $categoryId;
        $productsOfCategory->wrap($wrapperName);
        return $productsOfCategory->response();
    }


    public function create()
    {
        //
    }


    public function adminStore(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'category_id' => 'required|exists:categories,id',
            'price' => 'required|numeric',
            'image' => 'nullable|string|max:100',
            'item_characteristics' => 'nullable|array',
            'title' => 'nullable|string|max:255',
        ]);

        $product = Product::create($validatedData);
        return response()->json(['data' => new ProductResource($product)], 201);
    }


    public function show(string $id)
    {
        $product = Product::find($id);
        if (!$product) {
            return response()->json(['error' => 'Product not found'], 404);
        }
//        return new ProductResource($product);
        $productResource = new ProductResource($product);
        $productResource->wrap('product');
        return $productResource->response();
    }

    public function adminShow(string $id)
    {
        try {
            // Fetch the category by ID
            $product = Product::findOrFail($id);

            // Return the category as a JSON response
            return response()->json([
                'data' => $product,
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


    public function edit(string $id)
    {
        //
    }


    public function adminUpdate(Request $request, $id)
    {
        $validatedData = $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'category_id' => 'sometimes|required|exists:categories,id',
            'price' => 'sometimes|required|numeric',
            'image' => 'nullable|string|max:100',
            'item_characteristics' => 'nullable|array',
            'title' => 'nullable|string|max:255',
        ]);

        $product = Product::find($id);
        if (!$product) {
            return response()->json(['error' => 'Product not found'], 404);
        }

        $product->update($validatedData);
        return response()->json(['data' => new ProductResource($product)]);
    }


    public function destroy($id)
    {
        $product = Product::find($id);
        if (!$product) {
            return response()->json(['error' => 'Product not found'], 404);
        }

        $product->delete();
        return response()->json(null, 204)
            ->header('Access-Control-Allow-Origin', '*')
            ->header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS')
            ->header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    }
}
