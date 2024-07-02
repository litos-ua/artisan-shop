<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use App\Models\Order;
use App\Models\OrderDetail;
use App\Models\Product;
use App\Http\Resources\OrderResource;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use App\Mail\OrderPlaced;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Log;
use Exception;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class OrderController extends Controller
{
    public function index()
    {
        try {
            $orders = Order::all();
            return response()->json($orders);
        } catch (Exception $e) {
            Log::error('Error fetching orders', ['exception' => $e]);
            return response()->json(['error' => 'Unable to fetch orders'], 500);
        }
    }

    public function placeOrder(Request $request)
    {
        try {
            // Validate input
            $this->validateOrderRequest($request);

            // Create or update the customer
            $customer = $this->createOrUpdateCustomer($request);

            // Create the order
            $order = $this->createOrder($request, $customer);

            // Save order details and calculate total amount
            $totalAmount = $this->saveOrderDetails($request, $order);

            Mail::to($customer->email)->send(new OrderPlaced($order, $totalAmount));

            return response()->json([
                'message' => 'Order placed successfully',
                'total_amount' => $totalAmount,
                'order_id' => $order->id,
                'created_at' => $order->created_at,
            ], 201);
        } catch (QueryException $e) {
            Log::error('Database error in placeOrder', ['exception' => $e]);
            return response()->json(['error' => 'Database error: ' . $e->getMessage()], 500);
        } catch (Exception $e) {
            Log::error('Error in placeOrder', ['exception' => $e]);
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
        } catch (Exception $e) {
            Log::error('Validation error in validateOrderRequest', ['exception' => $e]);
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
            Log::error('Database error in createOrUpdateCustomer', ['exception' => $e]);
            throw $e;
        } catch (Exception $e) {
            Log::error('Error in createOrUpdateCustomer', ['exception' => $e]);
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
            Log::error('Database error in createOrder', ['exception' => $e]);
            throw $e;
        } catch (Exception $e) {
            Log::error('Error in createOrder', ['exception' => $e]);
            throw $e;
        }
    }

    protected function saveOrderDetails(Request $request, $order)
    {
        try {
            $totalAmount = 0;
            foreach ($request->cartItems as $item) {
                $orderDetail = new OrderDetail();
                $orderDetail->order_id = $order->id;
                $product = Product::where('name', $item['productKey'])->first();
                $orderDetail->product_id = $product->id;
                $orderDetail->quantity = $item['quantityCount'];
                $orderDetail->price = $product ? $product->price : ($item['price'] ?? 0);
                $orderDetail->save();

                // Calculate the total amount
                $price = $product ? $product->price : ($item['price'] ?? 0);
                $totalAmount += $price * $item['quantityCount'];
            }
            return $totalAmount;
        } catch (QueryException $e) {
            Log::error('Database error in saveOrderDetails', ['exception' => $e]);
            throw $e;
        } catch (Exception $e) {
            Log::error('Error in saveOrderDetails', ['exception' => $e]);
            throw $e;
        }
    }

    public function indexForCustomer(Request $request)
    {
        try {
            $user = Auth::user();

            if (!$user) {
                return response()->json(['error' => 'User not authenticated'], 401);
            }

            $customer = $user->customers()->first();

            if (!$customer) {
                return response()->json(['error' => 'Customer not found'], 404);
            }

            $orders = Order::where('customer_id', $customer->id)
                ->has('orderDetails')
                ->with('orderDetails.product')
                ->get();

            return response()->json(OrderResource::collection($orders));
        } catch (Exception $e) {
            Log::error('Error in indexForCustomer', ['exception' => $e]);
            return response()->json(['error' => 'Unable to fetch orders for customer'], 500);
        }
    }

    // Methods for the admin routes
    // Fetch all orders for admin
    public function adminIndex(Request $request)
    {
        try {
            $page = $request->input('_page', 1);
            $perPage = $request->input('_limit', 10);

            $sortField = $request->input('_sort', 'id');
            $sortOrder = $request->input('_order', 'ASC');

            $query = Order::with('orderDetails.product', 'customer')
                ->orderBy($sortField, $sortOrder);

            $orders = $query->paginate($perPage, ['*'], 'page', $page);
            $total = $orders->total();

            return response()->json([
                'data' => OrderResource::collection($orders->items()),
                'total' => $total
            ])->header('X-Total-Count', $total)
                ->header('Access-Control-Allow-Origin', '*')
                ->header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS')
                ->header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
                ->header('Access-Control-Expose-Headers', 'X-Total-Count');
        } catch (Exception $e) {
            Log::error('Error in adminIndex', ['exception' => $e]);
            return response()->json(['error' => 'Unable to fetch orders for admin'], 500);
        }
    }

    // Fetch a single order for admin by its ID
    public function adminShow($id)
    {
        try {
            $order = Order::with('orderDetails.product', 'customer')->findOrFail($id);
            return new OrderResource($order);
        } catch (ModelNotFoundException $e) {
            Log::error('Order not found in adminShow', ['exception' => $e, 'order_id' => $id]);
            return response()->json(['error' => 'Order not found'], 404);
        } catch (Exception $e) {
            Log::error('Error in adminShow', ['exception' => $e]);
            return response()->json(['error' => 'Unable to fetch order'], 500);
        }
    }

// Create a new order for admin
    public function adminStore(Request $request)
    {
        try {
            $order = Order::create($request->all());
            if ($request->has('order_details')) {
                foreach ($request->order_details as $detail) {
                    $order->orderDetails()->create($detail);
                }
            }
            return new OrderResource($order->load('orderDetails.product'));
        } catch (QueryException $e) {
            Log::error('Database error in adminStore', ['exception' => $e]);
            return response()->json(['error' => 'Database error: ' . $e->getMessage()], 500);
        } catch (Exception $e) {
            Log::error('Error in adminStore', ['exception' => $e]);
            return response()->json(['error' => 'An error occurred: ' . $e->getMessage()], 500);
        }
    }

    // Update an existing order for admin by its ID
    public function adminUpdate(Request $request, $id)
    {
        try {
            $order = Order::findOrFail($id);
            $order->update($request->all());
            // Update order details
            foreach ($request->order_details as $detail) {
                $orderDetail = $order->orderDetails()->find($detail['id']);
                if ($orderDetail) {
                    $orderDetail->update($detail);
                } else {
                    $order->orderDetails()->create($detail);
                }
            }
            return new OrderResource($order->load('orderDetails.product'));
        } catch (QueryException $e) {
            Log::error('Database error in adminUpdate', ['exception' => $e]);
            return response()->json(['error' => 'Database error: ' . $e->getMessage()], 500);
        } catch (Exception $e) {
            Log::error('Error in adminUpdate', ['exception' => $e]);
            return response()->json(['error' => 'An error occurred: ' . $e->getMessage()], 500);
        }
    }

    // Delete an order for admin by its ID
    public function adminDestroy($id)
    {
        try {
            $order = Order::findOrFail($id);
            $order->orderDetails()->delete();
            $order->delete();
            return response()->json(['message' => 'Order deleted successfully']);
        } catch (QueryException $e) {
            Log::error('Database error in adminDestroy', ['exception' => $e]);
            return response()->json(['error' => 'Database error: ' . $e->getMessage()], 500);
        } catch (Exception $e) {
            Log::error('Error in adminDestroy', ['exception' => $e]);
            return response()->json(['error' => 'An error occurred: ' . $e->getMessage()], 500);
        }
    }
}



//namespace App\Http\Controllers;
//
//use App\Models\Customer;
//use App\Models\Order;
//use App\Models\OrderDetail;
//use App\Models\Product;
//use App\Http\Resources\OrderResource;
//use Illuminate\Database\QueryException;
//use Illuminate\Http\Request;
//use App\Mail\OrderPlaced;
//use Illuminate\Support\Facades\Auth;
//use Illuminate\Support\Facades\Mail;
//
//class OrderController extends Controller
//{
//    public function index()
//    {
//        $orders = Order::all();
//        return response()->json($orders);
//    }
//
//    public function placeOrder(Request $request)
//    {
//        try {
//            // Validate input
//            $this->validateOrderRequest($request);
//
//            // Create or update the customer
//            $customer = $this->createOrUpdateCustomer($request);
//
//            // Create the orderdocker version
//            $order = $this->createOrder($request, $customer);
//
//            // Save order details and calculate total amount
//            $totalAmount = $this->saveOrderDetails($request, $order);
//
//            Mail::to($customer->email)->send(new OrderPlaced($order, $totalAmount));
//
//            return response()->json(['message' => 'Order placed successfully',
//                                     'total_amount' => $totalAmount,
//                                     'order_id' => $order->id,
//                                     'created_at' => $order->created_at,], 201);
//        } catch (QueryException $e) {
//            return response()->json(['error' => 'Database error: ' . $e->getMessage()], 500);
//        } catch (\Exception $e) {
//            return response()->json(['error' => 'An error occurred: ' . $e->getMessage()], 500);
//        }
//    }
//
//    protected function validateOrderRequest(Request $request)
//    {
//        try {
//            $request->validate([
//                // Validation rules for the 'customers' table
//                'email' => 'required|email|max:160',
//                'name' => 'required|string|max:60',
//                'surname' => 'required|string|max:100',
//                'phone' => 'required|string|max:20',
//                'zip_code' => 'nullable|string|max:10',
//                'address' => 'nullable|string',
//
//                // Validation rules for the 'orders' table
//                'delivery' => 'required|boolean',
//                'paymentType' => 'required|string|max:10',
//                'advancePayment' => 'required|boolean',
//                'notes' => 'nullable|string',
//
//                // Validation rules for the 'order_details' table
//                'cartItems' => 'required|array',
//                'cartItems.*.productKey' => 'required|string',
//                'cartItems.*.quantityCount' => 'required|integer|min:1',
//            ]);
//        } catch (\Exception $e) {
//            throw $e;
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
//                ]);
//            } else {
//                // Update the customer with any empty fields
//                $customer->update([
//                    'user_id' => $user->id,
//                    'first_name' => $customer->first_name ?? $request->name,
//                    'last_name' => $customer->last_name ?? $request->surname,
//                    'phone_number' => $customer->phone_number ?? $request->phone,
//                ]);
//            }
//            return $customer;
//        } catch (QueryException $e) {
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
//            ]);
//        } catch (QueryException $e) {
//            throw $e;
//        }
//    }
//
//    protected function saveOrderDetails(Request $request, $order)
//    {
//    // !!! $order->order_id - 'wrong' $order->id - 'true' !!!
//        try {
//            $totalAmount = 0;
//            $tmp = $request->cartItems;
//            foreach ($request->cartItems as $item) {
//                $orderDetail = new OrderDetail();
//                //$orderDetail->order_id = $order->order_id;
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
//                $quantityCount = $item['quantityCount'];
//                $totalAmount += $price * $item['quantityCount'];
//            }
//            return $totalAmount;
//        } catch (QueryException $e) {
//            throw $e;
//        }
//    }
//
//
//    public function indexForCustomer(Request $request)
//    {
//        $user = Auth::user();
//
//        if (!$user) {
//            return response()->json(['error' => 'User not authenticated'], 401);
//        }
//
//        $customer = $user->customers()->first();
//
//        if (!$customer) {
//            return response()->json(['error' => 'Customer not found'], 404);
//        }
//
//        $orders = Order::where('customer_id', $customer->id)
//            ->has('orderDetails')
//            ->with('orderDetails.product')
//            ->get();
//
//        return response()->json(OrderResource::collection($orders));
//    }
//
//    //Methods for the admin routes
//    // Fetch all orders for admin
//
//    public function adminIndex(Request $request)
//    {
//        $page = $request->input('_page', 1);
//        $perPage = $request->input('_limit', 10);
//
//        $sortField = $request->input('_sort', 'id');
//        $sortOrder = $request->input('_order', 'ASC');
//
//        $query = Order::with('orderDetails.product', 'customer')
//            ->orderBy($sortField, $sortOrder);
//
//        $orders = $query->paginate($perPage, ['*'], 'page', $page);
//        $total = $orders->total();
//
//        return response()->json([
//            'data' => OrderResource::collection($orders->items()),
//            'total' => $total
//        ])->header('X-Total-Count', $total)
//            ->header('Access-Control-Allow-Origin', '*')
//            ->header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS')
//            ->header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
//            ->header('Access-Control-Expose-Headers', 'X-Total-Count');
//    }
//
//    // Fetch a single order for admin by its ID
//    public function adminShow($id)
//    {
//        $order = Order::with('orderDetails.product', 'customer')->findOrFail($id);
//        return new OrderResource($order);
//    }
//
//    // Create a new order for admin
//    public function adminStore(Request $request)
//    {
//        $order = Order::create($request->all());
//        if ($request->has('order_details')) {
//            foreach ($request->order_details as $detail) {
//                $order->orderDetails()->create($detail);
//            }
//        }
//        return new OrderResource($order->load('orderDetails.product'));
//    }
//
//    // Update an existing order for admin by its ID
//    public function adminUpdate(Request $request, $id)
//    {
//        $order = Order::findOrFail($id);
//        $order->update($request->all());
//        // Update order details
//        foreach ($request->order_details as $detail) {
//            $orderDetail = $order->orderDetails()->find($detail['id']);
//            if ($orderDetail) {
//                $orderDetail->update($detail);
//            } else {
//                $order->orderDetails()->create($detail);
//            }
//        }
//        return new OrderResource($order->load('orderDetails.product'));
//    }
//
//    // Delete an order for admin by its ID
//    public function adminDestroy($id)
//    {
//        $order = Order::findOrFail($id);
//        $order->orderDetails()->delete();
//        $order->delete();
//        return response()->json(['message' => 'Order deleted successfully']);
//    }
//
//}

