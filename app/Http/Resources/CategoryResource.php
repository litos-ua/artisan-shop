<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CategoryResource extends JsonResource
{

    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
        ];
    }

//    public function toArray($request): array
//    {
////        $stop = 1;
////        echo "request=" . $request . PHP_EOL;
//        return [
//            'data' => $this->collection->map(function ($category) {
//                return [
//                    'id' => $category->id,
//                    'name' => $category->name,
//                ];
//            }),
//        ];
//    }

//    public function with($request)
//    {
//        return [
//            'categories' => $this->collection->toArray(),
//        ];
//    }
}
