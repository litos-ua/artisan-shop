<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

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
}
