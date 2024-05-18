<?php

//namespace App\Models;

//use Illuminate\Database\Eloquent\Factories\HasFactory;
//use Illuminate\Database\Eloquent\Model;
//
//class OrderDetail extends Model
//{
//    use HasFactory;
//
////    protected $primaryKey = 'order_detail_id';
//
//    protected $fillable = [
//        'order_id',
//        'product_id',
//        'quantity',
//        'price',
//    ];
//
//    // Define the relationship with Order model
//    public function order()
//    {
//        return $this->belongsTo(Order::class);
//    }
//
//
//    // Define the relationship with Product model
//    public function product()
//    {
//        return $this->hasOne(Product::class, 'id', 'product_id');
//    }
//
//    // Accessor method to calculate the amount based on quantity and price
//    public function getAmountAttribute()
//    {
//        return $this->quantity * $this->price;
//    }
//}

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrderDetail extends Model
{
    use HasFactory;

    protected $fillable = [
        'order_id',
        'product_id',
        'quantity',
        'price',
    ];

    // Define the relationship with Order model
    public function order()
    {
        return $this->belongsTo(Order::class);
    }

    // Define the relationship with Product model
    public function product()
    {
        return $this->belongsTo(Product::class, 'product_id');
    }

    // Accessor method to calculate the amount based on quantity and price
    public function getAmountAttribute()
    {
        return $this->quantity * $this->price;
    }
}
