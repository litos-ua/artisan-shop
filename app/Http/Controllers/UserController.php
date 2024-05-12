<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

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
}
