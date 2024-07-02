<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\Rule;
use Exception;

class CustomerController extends Controller
{
    public function index()
    {
        try {
            $customers = Customer::all();
            return response()->json($customers);
        } catch (Exception $e) {
            Log::error('Error retrieving customers', ['exception' => $e]);
            return response()->json(['error' => 'An error occurred while retrieving customers'], 500);
        }
    }

    public function adminIndex()
    {
        try {
            $customers = Customer::all();
            return response()->json($customers);
        } catch (Exception $e) {
            Log::error('Error retrieving customers for admin', ['exception' => $e]);
            return response()->json(['error' => 'An error occurred while retrieving customers for admin'], 500);
        }
    }

    public function store(Request $request)
    {
        try {
            $validatedData = $request->validate([
                // You can define validation rules here
            ]);

            $customer = Customer::create($validatedData);
            return response()->json($customer, 201);
        } catch (Exception $e) {
            Log::error('Error storing new customer', ['exception' => $e]);
            return response()->json(['error' => 'An error occurred while storing the new customer'], 500);
        }
    }

    public function show($id)
    {
        try {
            $customer = Customer::findOrFail($id);
            return response()->json($customer);
        } catch (Exception $e) {
            Log::error("Error retrieving customer with ID $id", ['exception' => $e]);
            return response()->json(['error' => 'An error occurred while retrieving the customer'], 500);
        }
    }

    public function adminShow($id)
    {
        try {
            $customer = Customer::findOrFail($id);
            return response()->json($customer);
        } catch (Exception $e) {
            Log::error("Error retrieving customer with ID $id for admin", ['exception' => $e]);
            return response()->json(['error' => 'An error occurred while retrieving the customer for admin'], 500);
        }
    }

    public function showCustomer()
    {
        try {
            $user = Auth::user();

            if ($user) {
                $customer = $user->customers()->first();
                if ($customer) {
                    return $customer;
                } else {
                    return response()->json(['error' => 'Customer not found'], 404);
                }
            } else {
                return response()->json(['error' => 'User not authenticated'], 401);
            }
        } catch (Exception $e) {
            Log::error('Error retrieving customer for authenticated user', ['exception' => $e]);
            return response()->json(['error' => 'An error occurred while retrieving the customer'], 500);
        }
    }

    public function update(Request $request, $id)
    {
        try {
            $customer = Customer::findOrFail($id);

            $validatedData = $request->validate([
                'first_name' => 'nullable|string|min:3|max:60',
                'last_name' => 'nullable|string|min:3|max:100',
                'email' => [
                    'nullable',
                    'email',
                    Rule::unique('customers')->ignore($customer->id),
                    'max:160',
                ],
                'phone_number' => 'nullable|string|max:20',
                'zip_code' => 'nullable|string|max:10',
                'address' => 'nullable|string|max:255',
            ]);

            $customer->update($validatedData);
            return response()->json($customer, 200);
        } catch (Exception $e) {
            Log::error("Error updating customer with ID $id", ['exception' => $e]);
            return response()->json(['error' => 'An error occurred while updating the customer'], 500);
        }
    }

    public function adminUpdate(Request $request, $id)
    {
        try {
            $customer = Customer::findOrFail($id);

            $validatedData = $request->validate([
                'first_name' => 'nullable|string|min:3|max:60',
                'last_name' => 'nullable|string|min:3|max:100',
                'phone_number' => 'nullable|string|max:20',
                'zip_code' => 'nullable|string|max:10',
                'address' => 'nullable|string|max:255',
            ]);

            $customer->update($validatedData);
            return response()->json($customer, 200);
        } catch (Exception $e) {
            Log::error("Error updating customer with ID $id for admin", ['exception' => $e]);
            return response()->json(['error' => 'An error occurred while updating the customer for admin'], 500);
        }
    }

    public function destroy($id)
    {
        try {
            $customer = Customer::findOrFail($id);
            $customer->delete();
            return response()->json(null, 204);
        } catch (Exception $e) {
            Log::error("Error deleting customer with ID $id", ['exception' => $e]);
            return response()->json(['error' => 'An error occurred while deleting the customer'], 500);
        }
    }

    public function adminDestroy($id)
    {
        try {
            $customer = Customer::findOrFail($id);
            $customer->delete();
            return response()->json(null, 204);
        } catch (Exception $e) {
            Log::error("Error deleting customer with ID $id for admin", ['exception' => $e]);
            return response()->json(['error' => 'An error occurred while deleting the customer for admin'], 500);
        }
    }
}




//namespace App\Http\Controllers;
//
//use App\Models\Customer;
//use Illuminate\Http\Request;
//use Illuminate\Support\Facades\Auth;
//use Illuminate\Validation\Rule;
//
//class CustomerController extends Controller
//{
//    public function index()
//    {
//        $customers = Customer::all();
//        return response()->json($customers);
//    }
//
//    public function adminIndex()
//    {
//        $customers = Customer::all();
//        return response()->json($customers);
//    }
//
//    public function store(Request $request)
//    {
//        // Validate and store a new customer
//        $validatedData = $request->validate([
//            // You can define validation rules here
//        ]);
//
//        $customer = Customer::create($validatedData);
//        return response()->json($customer, 201);
//    }
//
//    public function show($id)
//    {
//        // Retrieve a specific customer by ID
//        $customer = Customer::findOrFail($id);
//        return response()->json($customer);
//    }
//
//    public function adminShow($id)
//    {
//        $customer = Customer::findOrFail($id);
//        return response()->json($customer);
//    }
//
//    public function showCustomer()
//    {
//        $user = Auth::user();
//
//        if ($user) {
//            $customer = $user->customers()->first();
//            if ($customer) {
//                return $customer;
//            } else {
//                return response()->json(['error' => 'Customer not found'], 404);
//            }
//        } else {
//            return response()->json(['error' => 'User not authenticated'], 401);
//        }
//    }
//
//    public function update(Request $request, $id)
//    {
//        $customer = Customer::findOrFail($id);
//
//        $validatedData = $request->validate([
//            'first_name' => 'nullable|string|min:3|max:60',
//            'last_name' => 'nullable|string|min:3|max:100',
//            'email' => [
//                'nullable',
//                'email',
//                Rule::unique('customers')->ignore($customer->id),
//                'max:160',
//            ],
//            'phone_number' => 'nullable|string|max:20',
//            'zip_code' => 'nullable|string|max:10',
//            'address' => 'nullable|string|max:255',
//        ]);
//
//        $customer->update($validatedData);
//        return response()->json($customer, 200);
//    }
//
//    public function adminUpdate(Request $request, $id)
//    {
//        $customer = Customer::findOrFail($id);
//
//        $validatedData = $request->validate([
//            'first_name' => 'nullable|string|min:3|max:60',
//            'last_name' => 'nullable|string|min:3|max:100',
//            'phone_number' => 'nullable|string|max:20',
//            'zip_code' => 'nullable|string|max:10',
//            'address' => 'nullable|string|max:255',
//        ]);
//
//        $customer->update($validatedData);
//        return response()->json($customer, 200);
//    }
//
//
//    public function destroy($id)
//    {
//        // Delete a specific customer by ID
//        $customer = Customer::findOrFail($id);
//        $customer->delete();
//        return response()->json(null, 204);
//    }
//
//    public function adminDestroy($id)
//    {
//        $customer = Customer::findOrFail($id);
//        $customer->delete();
//        return response()->json(null, 204);
//    }
//}
