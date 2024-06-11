<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProductResource;
use App\Models\Product;
use Illuminate\Http\Request;

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
//        // Paginate the products
//        $perPage = $request->input('perPage', 5); // Default to 5 per page if not specified
////        $products = Product::paginate($perPage);
//        $products = Product::with('category')->paginate($perPage);
//
//        // Get the total count for the X-Total-Count header
//        $total = $products->total();
//        $productsItems = $products->items();
//
//        return response()->json($productsItems)
//            ->header('X-Total-Count', $total)
//            ->header('Access-Control-Allow-Origin', '*')
//            ->header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS')
//            ->header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
//            ->header('Access-Control-Expose-Headers', 'X-Total-Count');
//    }

//    public function adminIndex(Request $request)
//    {
//        $start = $request->input('_start', 0);
//        $end1 = $request->input('_end' );
//        $end = $request->input('_end', 5);
//        $perPage = $end - $start;
//        $page = ($start / $perPage) + 1;
//
//        $sortField = $request->input('_sort', 'id');
//        $sortOrder = $request->input('_order', 'ASC');
//
//        $query = Product::query();
//        $query->orderBy($sortField, $sortOrder);
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
        $start = $request->input('_start', 0);
        $end = $request->input('_end', 5);
        $perPage = $end - $start;
        $page = ($start / $perPage) + 1;

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


    public function store(Request $request)
    {
        //
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


    public function edit(string $id)
    {
        //
    }


    public function update(Request $request, string $id)
    {
        //
    }


    public function destroy(string $id)
    {
        //
    }
}
