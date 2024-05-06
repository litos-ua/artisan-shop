<?php

//namespace App\Http\Controllers;
//
//use App\Models\Customer;
//use App\Models\OrderDetail;
//use App\Models\Product;
//use Illuminate\Http\Request;
//use App\Models\Order;
//
//class OrderController extends Controller
//{
//    public function placeOrder(Request $request)
//    {
//        $user = $request->user();
//
//        $customer = Customer::where('email', $request->email)->first();
//
//        if (!$customer) {
//            $customer = Customer::create([
//                'user_id' => $user->id,
//                'first_name' => $request->name,
//                'last_name' => $request->surname,
//                'email' => $request->email,
//                'phone_number' => $request->phone,
//            ]);
//        } else {
//            $customer->update([
//                'user_id' => $user->id,
//                'first_name' => $customer->first_name ?? $request->name,
//                'last_name' => $customer->last_name ?? $request->surname,
//                'phone_number' => $customer->phone_number ?? $request->phone,
//            ]);
//        }
//
//            $order = Order::create([
//                'customer_id' => $customer->id,
//                'delivery_requirement' => $request->delivery,
//                'type_of_payment' => $request->paymentType,
//                'advance_payment' => $request->advancePayment,
//                'customer_notes' => $request->notes,
//            ]);
//
//
//        foreach ($request->cartItems as $item) {
//            $orderDetail = new OrderDetail();
//            $orderDetail->order_id = $order->order_id; // Assuming order_id is a foreign key in the order_details table
//            $product = Product::where('name', $item['productKey'])->first();
//            $orderDetail->product_id = $product->id;
//            $orderDetail->quantity = $item['quantityCount'];
//            if ($product) {
//                $orderDetail->price = $product->price;
//            } else if($item['price']){
//                $orderDetail->price = $item['price'];
//            } else {
//                $orderDetail->price = 0;
//            }
//
//            $orderDetail->save();
//        }
//
//        return response()->json(['message' => 'Order placed successfully']);
//    }
//}
//
//
//namespace App\Http\Controllers;
//
//use App\Models\Customer;
//use App\Models\OrderDetail;
//use App\Models\Product;
//use Illuminate\Database\QueryException;
//use Illuminate\Http\Request;
//use App\Models\Order;
//
//class OrderController extends Controller
//{
//    public function placeOrder(Request $request)
//    {
//        try {
//            // Create or update the customer
//            $customer = $this->createOrUpdateCustomer($request);
//
//            // Create the order
//            $order = $this->createOrder($request, $customer);
//
//            // Save order details
//            $totalAmount = $this->saveOrderDetails($request, $order);
//
//            return response()->json(['message' => 'Order placed successfully',
//                'total_amount' => $totalAmount], 201);
//        } catch (QueryException $e) {
//            // Handle database query exceptions
//            return response()->json(['error' => 'Database error: ' . $e->getMessage()], 500);
//        } catch (\Exception $e) {
//            // Handle other exceptions
//            return response()->json(['error' => 'An error occurred: ' . $e->getMessage()], 500);
//        }
//    }
//
//    protected function createOrUpdateCustomer(Request $request)
//    {
//        try {
//            $user = $request->user();
//            $customer = Customer::where('email', $request->email)->first();
//
//            if (!$customer) {
//                // Create a new customer if not found
//                $customer = Customer::create([
//                    'user_id' => $user->id,
//                    'first_name' => $request->name,
//                    'last_name' => $request->surname,
//                    'email' => $request->email,
//                    'phone_number' => $request->phone,
//                    // Add more fields as needed
//                ]);
//            } else {
//                // Update the customer with any empty fields
//                $customer->update([
//                    'user_id' => $user->id,
//                    'first_name' => $customer->first_name ?? $request->name,
//                    'last_name' => $customer->last_name ?? $request->surname,
//                    'phone_number' => $customer->phone_number ?? $request->phone,
//                    // Update more fields as needed
//                ]);
//            }
//            return $customer;
//        } catch (QueryException $e) {
//            // Handle database query exceptions for customers
//            throw $e;
//        }
//    }
//
//    protected function createOrder(Request $request, $customer)
//    {
//        try {
//            return Order::create([
//                'customer_id' => $customer->id,
//                'delivery_requirement' => $request->delivery,
//                'type_of_payment' => $request->paymentType,
//                'advance_payment' => $request->advancePayment,
//                'customer_notes' => $request->notes,
//                // Add more fields as needed
//            ]);
//        } catch (QueryException $e) {
//            // Handle database query exceptions for orders
//            throw $e;
//        }
//    }
//
//    protected function saveOrderDetails(Request $request, $order)
//    {
//        try {
//            $totalAmount = 0;
//            foreach ($request->cartItems as $item) {
//                $orderDetail = new OrderDetail();
//                $orderDetail->order_id = $order->id;
//                $product = Product::where('name', $item['productKey'])->first();
//                $orderDetail->product_id = $product->id;
//                $orderDetail->quantity = $item['quantityCount'];
//                if ($product) {
//                    $orderDetail->price = $product->price;
//                } else if ($item['price']) {
//                    $orderDetail->price = $item['price'];
//                } else {
//                    $orderDetail->price = 0;
//                }
//                $orderDetail->save();
//                // Calculate the total amount
//                $price = $product ? $product->price : ($item['price'] ?? 0);
//                $totalAmount += $price * $item['quantityCount'];
//            }
//            return $totalAmount;
//        } catch (QueryException $e) {
//            // Handle database query exceptions for order details
//            throw $e;
//        }
//    }
//}

namespace App\Http\Controllers;

use App\Models\Customer;
use App\Models\OrderDetail;
use App\Models\Product;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use App\Models\Order;

class OrderController extends Controller
{
    public function placeOrder(Request $request)
    {
        try {
            // Validate input
            $this->validateOrderRequest($request);

            // Create or update the customer
            $customer = $this->createOrUpdateCustomer($request);

            // Create the orderdocker version
            $order = $this->createOrder($request, $customer);

            // Save order details and calculate total amount
            $totalAmount = $this->saveOrderDetails($request, $order);

            return response()->json(['message' => 'Order placed successfully',
                                     'total_amount' => $totalAmount,
                                     'order_id' => $order->order_id,
                                     'created_at' => $order->created_at,], 201);
        } catch (QueryException $e) {
            return response()->json(['error' => 'Database error: ' . $e->getMessage()], 500);
        } catch (\Exception $e) {
            return response()->json(['error' => 'An error occurred: ' . $e->getMessage()], 500);
        }
    }

    protected function validateOrderRequest(Request $request)
    {
        try {
            $request->validate([
                // Validation rules for the 'customers' table
                'email' => 'required|email|max:160',
                'name' => 'required|string|max:60',
                'surname' => 'required|string|max:100',
                'phone' => 'required|string|max:20',
                'zip_code' => 'nullable|string|max:10',
                'address' => 'nullable|string',

                // Validation rules for the 'orders' table
                'delivery' => 'required|boolean',
                'paymentType' => 'required|string|max:10',
                'advancePayment' => 'required|boolean',
                'notes' => 'nullable|string',

                // Validation rules for the 'order_details' table
                'cartItems' => 'required|array',
                'cartItems.*.productKey' => 'required|string',
                'cartItems.*.quantityCount' => 'required|integer|min:1',
            ]);
        } catch (\Exception $e) {
            throw $e;
        }
    }

    protected function createOrUpdateCustomer(Request $request)
    {
        try {
            $user = $request->user();
            $customer = Customer::where('email', $request->email)->first();

            if (!$customer) {
                // Create a new customer if not found
                $customer = Customer::create([
                    'user_id' => $user->id,
                    'first_name' => $request->name,
                    'last_name' => $request->surname,
                    'email' => $request->email,
                    'phone_number' => $request->phone,
                ]);
            } else {
                // Update the customer with any empty fields
                $customer->update([
                    'user_id' => $user->id,
                    'first_name' => $customer->first_name ?? $request->name,
                    'last_name' => $customer->last_name ?? $request->surname,
                    'phone_number' => $customer->phone_number ?? $request->phone,
                ]);
            }
            return $customer;
        } catch (QueryException $e) {
            throw $e;
        }
    }

    protected function createOrder(Request $request, $customer)
    {
        try {
            return Order::create([
                'customer_id' => $customer->id,
                'delivery_requirement' => $request->delivery,
                'type_of_payment' => $request->paymentType,
                'advance_payment' => $request->advancePayment,
                'customer_notes' => $request->notes,
            ]);
        } catch (QueryException $e) {
            throw $e;
        }
    }

    protected function saveOrderDetails(Request $request, $order)
    {
    // !!! $order->id - 'wrong' $order->order_id - 'true' !!!
        try {
            $totalAmount = 0;
            foreach ($request->cartItems as $item) {
                $orderDetail = new OrderDetail();
                $orderDetail->order_id = $order->order_id;
                $product = Product::where('name', $item['productKey'])->first();
                $orderDetail->product_id = $product->id;
                $orderDetail->quantity = $item['quantityCount'];
                if ($product) {
                    $orderDetail->price = $product->price;
                } else if ($item['price']) {
                    $orderDetail->price = $item['price'];
                } else {
                    $orderDetail->price = 0;
                }
                $orderDetail->save();
                // Calculate the total amount
                $price = $product ? $product->price : ($item['price'] ?? 0);
                $quantityCount = $item['quantityCount'];
                $totalAmount += $price * $item['quantityCount'];
            }
            return $totalAmount;
        } catch (QueryException $e) {
            throw $e;
        }
    }
}

