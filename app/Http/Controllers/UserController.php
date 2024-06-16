<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class UserController extends Controller
{
    public function getUserByEmail(Request $request)
    {
        // Get the authenticated user
        $user = $request->user();

        // Retrieve the user's email
        $email = $user->email;

        return response()->json(['email' => $email]);
    }

    public function getUser(Request $request)
    {
        if (Auth::user()) {
            $authVerification = true;
            return response()->json([
                'authenticated' => $authVerification,
                'user' => Auth::user(),
            ]);
        } else {
            $authVerification = false;
            return response()->json(['authenticated' => $authVerification]);
        }
    }

    public function changePassword(Request $request)
    {
        $user = $request->user();
        //$user =Auth::user();

        // Validate the request data
        $validatedData = $request->validate([
            'currentPassword' => 'required|string',
            'newPassword' => 'required|string|min:8',
        ]);

        // Check if the current password matches the user's actual password
        if (!Hash::check($validatedData['currentPassword'], $user->password)) {
            return response()->json(['message' => 'Current password is incorrect'], 400);
        }

        // Update the user's password
        $user->password = Hash::make($validatedData['newPassword']);
        $user->save();

        return response()->json(['message' => 'Password changed successfully'], 200);
    }

    public function adminIndex()
    {
        // Only allow admins to list users
        if (Auth::user()->role !== 3) {
            return response()->json(['error' => 'Forbidden'], 403);
        }

        $users = User::where('role', '!=', 3)->get(['id', 'name', 'email', 'role']);
        return response()->json($users);
    }

    public function adminShow($id)
    {
        // Only allow admins to view user details
        if (Auth::user()->role !== 3) {
            return response()->json(['error' => 'Forbidden'], 403);
        }

        $user = User::find($id, ['id', 'name', 'email', 'role']);
        if (!$user || $user->role === 3) {
            return response()->json(['error' => 'User not found or access forbidden'], 404);
        }
        return response()->json($user);
    }

    public function adminUpdate(Request $request, $id)
    {
        // Only allow admins to update user details
        if (Auth::user()->role !== 3) {
            return response()->json(['error' => 'Forbidden'], 403);
        }

        $user = User::find($id);
        if (!$user || $user->role === 3) {
            return response()->json(['error' => 'User not found or access forbidden'], 404);
        }

        $validatedData = $request->validate([
            'name' => 'sometimes|string|max:255',
            'email' => 'sometimes|string|email|max:255|unique:users,email,' . $id,
            'role' => 'sometimes|integer',
        ]);

        $user->update($validatedData);

        return response()->json(['message' => 'User updated successfully']);
    }

    public function adminDestroy($id)
    {
        // Only allow admins to delete users except other admins
        if (Auth::user()->role !== 3) {
            return response()->json(['error' => 'Forbidden'], 403);
        }

        $user = User::find($id);
        if (!$user || $user->role === 3) {
            return response()->json(['error' => 'User not found or access forbidden'], 404);
        }

        $user->delete();

        return response()->json(['message' => 'User deleted successfully']);
    }

}
