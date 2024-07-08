<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProductResource;
use App\Models\Product;
use Illuminate\Http\Request;
use Exception;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Support\Facades\Log;

class ProductController extends Controller
{
    public function index()
    {
        try {
            $products = Product::all();
            $productsResponse = ProductResource::collection($products);
            $productsResponse->wrap('products');
            return $productsResponse->response();
        } catch (Exception $e) {
            Log::error('Error in index method', ['exception' => $e]);
            return response()->json(['error' => 'Unable to fetch products'], 500);
        }
    }


    public function adminIndex(Request $request)
    {
        try {
            $page = $request->input('_page', 1);
            $perPage = $request->input('_limit', 5);
            $sortField = $request->input('_sort', 'id');
            $sortOrder = $request->input('_order', 'ASC');

            $query = Product::with('category');

            // Handle sorting by category name
            if ($sortField === 'category.name') {
                $query = $query->join('categories', 'products.category_id', '=', 'categories.id')
                    ->orderBy('categories.name', $sortOrder)
                    ->select('products.*'); // Ensure only product fields are selected
            } else {
                $query = $query->orderBy($sortField, $sortOrder);
            }

            $products = $query->paginate($perPage, ['*'], 'page', $page);
            $total = $products->total();

            return response()->json($products->items())
                ->header('X-Total-Count', $total)
                ->header('Access-Control-Allow-Origin', '*')
                ->header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS')
                ->header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
                ->header('Access-Control-Expose-Headers', 'X-Total-Count');
        } catch (Exception $e) {
            Log::error('Error in adminIndex method', ['exception' => $e, 'request' => $request->all()]);
            return response()->json(['error' => 'Unable to fetch products'], 500);
        }
    }

    public function indexByCategory($categoryId)
    {
        try {
            $products = Product::where('category_id', $categoryId)->get();
            $productsOfCategory = ProductResource::collection($products);
            $wrapperName = "productsByCategory_" . $categoryId;
            $productsOfCategory->wrap($wrapperName);
            return $productsOfCategory->response();
        } catch (Exception $e) {
            Log::error('Error in indexByCategory method', ['exception' => $e, 'categoryId' => $categoryId]);
            return response()->json(['error' => 'Unable to fetch products for the category'], 500);
        }
    }

    public function create()
    {
        //
    }

    public function adminStore(Request $request)
    {
        try {
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
        } catch (Exception $e) {
            Log::error('Error in adminStore method', ['exception' => $e, 'request' => $request->all()]);
            return response()->json(['error' => 'Unable to create product'], 500);
        }
    }

    public function show(string $id)
    {
        try {
            $product = Product::find($id);
            if (!$product) {
                return response()->json(['error' => 'Product not found'], 404);
            }

            $productResource = new ProductResource($product);
            $productResource->wrap('product');
            return $productResource->response();
        } catch (Exception $e) {
            Log::error('Error in show method', ['exception' => $e, 'product_id' => $id]);
            return response()->json(['error' => 'Unable to fetch product'], 500);
        }
    }

    public function adminShow(string $id)
    {
        try {
            $product = Product::findOrFail($id);
            return response()->json(['data' => $product], 200);
        } catch (ModelNotFoundException $e) {
            Log::error('Product not found in adminShow method', ['exception' => $e, 'product_id' => $id]);
            return response()->json(['error' => 'Product not found'], 404);
        } catch (Exception $e) {
            Log::error('Error in adminShow method', ['exception' => $e, 'product_id' => $id]);
            return response()->json(['error' => 'An error occurred'], 500);
        }
    }

    public function edit(string $id)
    {
        //
    }

    public function adminUpdate(Request $request, $id)
    {
        try {
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
        } catch (ModelNotFoundException $e) {
            Log::error('Product not found in adminUpdate method', ['exception' => $e, 'product_id' => $id]);
            return response()->json(['error' => 'Product not found'], 404);
        } catch (Exception $e) {
            Log::error('Error in adminUpdate method', ['exception' => $e, 'request' => $request->all(), 'product_id' => $id]);
            return response()->json(['error' => 'Unable to update product'], 500);
        }
    }

    public function destroy($id)
    {
        try {
            $product = Product::find($id);
            if (!$product) {
                return response()->json(['error' => 'Product not found'], 404);
            }

            $product->delete();
            return response()->json(null, 204)
                ->header('Access-Control-Allow-Origin', '*')
                ->header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS')
                ->header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        } catch (ModelNotFoundException $e) {
            Log::error('Product not found in destroy method', ['exception' => $e, 'product_id' => $id]);
            return response()->json(['error' => 'Product not found'], 404);
        } catch (Exception $e) {
            Log::error('Error in destroy method', ['exception' => $e, 'product_id' => $id]);
            return response()->json(['error' => 'Unable to delete product'], 500);
        }
    }
}



