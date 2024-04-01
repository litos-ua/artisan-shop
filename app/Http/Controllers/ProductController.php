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
