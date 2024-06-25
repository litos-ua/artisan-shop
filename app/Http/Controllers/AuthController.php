<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Auth\Events\Registered;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    /**
     * Register a new user.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */

    public function register(Request $request)
    {
        try {
            $validatedData = $request->validate([
                'name' => 'required|string|min:3|max:20',
                'email' => 'required|string|email|max:255|unique:users',
                'password' => 'required|string|min:8',
            ]);

            $user = User::create([
                'name' => $validatedData['name'],
                'email' => $validatedData['email'],
                'password' => Hash::make($validatedData['password']),
            ]);

            // Send verification email
            $user->sendEmailVerificationNotification();

            // Dispatch the Registered event
            event(new Registered($user));

            return response()->json(['message' => 'User registered successfully. Verification email sent.'], 201);
        } catch (ValidationException $e) {
            $b = response()->json(['message' => 'Validation error', 'errors' => $e->errors()], 422);
            return response()->json(['message' => 'Validation error', 'errors' => $e->errors()], 422);
        } catch (\Exception $e) {
            // Handle other exceptions
            return response()->json(['message' => 'Failed to register user', 'error' => $e->getMessage()], 500);
        }
    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(Request $request)
    {
        // Validate incoming request data
        $credentials = $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);

        // Attempt to authenticate the user
        if (Auth::attempt($credentials)) {
            $user = Auth::user();

            // Check if the user's email is verified
            if (!$user->hasVerifiedEmail()) {

                $token = $this->generateToken($user);

                return response()->json([
                    'token' => $token,
                    'message' => 'Token has been generated. Email not verified',
                    'status' => 207,
                    'user' => $user,
                ], 207);
            }

            // Authentication successful, generate token
            $token = $this->generateToken($user);

            // Return token as response
            return response()->json([
                'token' => $token,
                'message' => 'Token has been generated.',
                'status' => 201,
                'user' => $user,
            ], 201);
        } else {
            // Check if the user exists
            $user = User::where('email', $credentials['email'])->first();

            if (!$user) {
                // If user does not exist, return appropriate error response
                return response()->json([
                    'message' => 'User not found',
                    'status' => 404
                ], 404);
            } else {
                // If email and password combination is incorrect, return generic error response
                return response()->json([
                    'message' => 'Invalid email or password. Please try again.',
                    'status' => 401
                ], 401);
            }
        }
    }


    private function generateToken($user)
    {
        // Generate a new token
        $token = $user->createToken('AuthToken')->plainTextToken;

        return $token;
    }

    private function retrieveOrGenerateToken($user)
    {
        // Retrieve all tokens for the user
        $tokens = $user->tokens;

        // Sort tokens by expiration date and creation date
        $sortedTokens = $tokens->sortByDesc(function ($token) {
            return [$token->expires_at, $token->created_at];
        });

        // Check if there are any tokens
        if ($sortedTokens->count() > 0) {
            // Retrieve the token with the latest expiration date and creation date
            $latestToken = $sortedTokens->first();
            $token = $latestToken->token;
        } else {
            // Generate a new token
            $token = $this->generateToken($user);
        }

        return $token;
    }

    /**
     * Log the user out.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout(Request $request)
    {
        // Revoke the current user's token
        $request->user()->currentAccessToken()->delete();

        // Return a success response
        return response()->json(['message' => 'Logout successful']);
    }

}




