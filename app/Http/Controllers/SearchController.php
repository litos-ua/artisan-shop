<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Resources\ProductResource;
use App\Models\Product;
class SearchController extends Controller
{
    public function searchProducts($search)
    {
        $products = Product::where('name', 'like', "%$search%")->get();

        $productsResponse = ProductResource::collection($products);
        $productsResponse->wrap('productsBySearchParam');

        return $productsResponse->response();
    }
}
