<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Resources\ProductResource;
use App\Models\Product;
use Exception;
use Illuminate\Support\Facades\Log;

class SearchController extends Controller
{
    public function searchProducts($search)
    {
        try {
            $products = Product::where('name', 'like', "%$search%")->get();
            $productsResponse = ProductResource::collection($products);
            $productsResponse->wrap('productsBySearchParam');
            return $productsResponse->response();
        } catch (Exception $e) {
            Log::error('Error in searchProducts method', ['exception' => $e, 'search' => $search]);
            return response()->json(['error' => 'Unable to perform product search'], 500);
        }
    }
}


//namespace App\Http\Controllers;
//
//use Illuminate\Http\Request;
//use App\Http\Resources\ProductResource;
//use App\Models\Product;
//class SearchController extends Controller
//{
//    public function searchProducts($search)
//    {
//        $products = Product::where('name', 'like', "%$search%")->get();
//
//        $productsResponse = ProductResource::collection($products);
//        $productsResponse->wrap('productsBySearchParam');
//
//        return $productsResponse->response();
//    }
//}
