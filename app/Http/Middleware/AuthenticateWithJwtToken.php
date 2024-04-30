<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class AuthenticateWithJwtToken
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */

    public function handle(Request $request, Closure $next): Response
    {
        $bearerToken = $request->bearerToken();
        $tokenPrefix = config('sanctum.token_prefix', 'SANCTUM_TOKEN');
        $tokenParts = explode('|', $bearerToken);
        $tokenWithoutPrefix = $tokenParts[1] ?? $bearerToken;
        $bearerToken = $tokenWithoutPrefix;

        if (!$bearerToken) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        // Verify the token against the user's tokens in the database
        $user = User::whereHas('tokens', function ($query) use ($bearerToken) {
            $query->where('token', hash('sha256', $bearerToken));
        })->first();

        if (!$user) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        // Authenticate the user
        Auth::login($user);
//        $authUser =Auth::user();

        // Proceed with the request
        return $next($request);
    }
}

