<?php

//namespace App\Models;
//
//use Illuminate\Database\Eloquent\Factories\HasFactory;
//use Illuminate\Database\Eloquent\Model;
//class Order extends Model
//{
//    use HasFactory;
//
////    protected $primaryKey = 'order_id';
//
//    protected $fillable = [
//        'customer_id',
//        'delivery_requirement',
//        'received_status',
//        'type_of_payment',
//        'payment_status',
//        'advance_payment',
//        'customer_notes',
//    ];
//
//    // Define the relationship with Customer model
//    public function customer()
//    {
//        return $this->belongsTo(Customer::class);
//    }
//
//    // Define the relationship with OrderDetail model
//    public function orderDetails()
//    {
//        //return $this->hasOne(OrderDetail::class, 'order_id');
//        return $this->hasMany(OrderDetail::class, 'order_id');
//    }
//}

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'customer_id',
        'delivery_requirement',
        'received_status',
        'type_of_payment',
        'payment_status',
        'advance_payment',
        'customer_notes',
    ];

    // Define the relationship with Customer model
    public function customer()
    {
        return $this->belongsTo(Customer::class);
    }

    // Define the relationship with OrderDetail model
    public function orderDetails()
    {
        return $this->hasMany(OrderDetail::class, 'order_id');
    }
}