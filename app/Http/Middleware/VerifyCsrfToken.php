<?php
//
//namespace App\Http\Middleware;
//
//use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken as Middleware;
//
//class VerifyCsrfToken extends Middleware
//{
//    /**
//     * The URIs that should be excluded from CSRF verification.
//     *
//     * @var array<int, string>
//     */
//    protected $except = [
//        //
//    ];
//}


namespace App\Http\Middleware;

use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken as Middleware;
use Closure;
use Illuminate\Http\Request;

class VerifyCsrfToken extends Middleware
{
    /**
     * The URIs that should be excluded from CSRF verification.
     *
     * @var array<int, string>
     */
    protected $except = [
        //
    ];

    /**
     * Handle an incoming request.
     *
     * @param \Illuminate\Http\Request $request
     * @param \Closure $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $response = $next($request);

        // Add CORS headers to allow all origins
        $response->header('Access-Control-Allow-Origin', '*');
        $response->header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        $response->header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

        return $response;
    }
}
