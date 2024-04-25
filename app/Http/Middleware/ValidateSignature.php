<?php
//
//namespace App\Http\Middleware;
//
//use Illuminate\Routing\Middleware\ValidateSignature as Middleware;
//
//class ValidateSignature extends Middleware
//{
//    /**
//     * The names of the query string parameters that should be ignored.
//     *
//     * @var array<int, string>
//     */
//    protected $except = [
//        // 'fbclid',
//        // 'utm_campaign',
//        // 'utm_content',
//        // 'utm_medium',
//        // 'utm_source',
//        // 'utm_term',
//    ];
//
//}


namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Routing\Middleware\ValidateSignature as Middleware;

class ValidateSignature extends Middleware
{
    /**
     * The names of the query string parameters that should be ignored.
     *
     * @var array<int, string>
     */
    protected $except = [
        // 'fbclid',
        // 'utm_campaign',
        // 'utm_content',
        // 'utm_medium',
        // 'utm_source',
        // 'utm_term',
    ];

    public function handle($request, Closure $next, ...$guards)
    {
        // Access route parameters
        $id = $request->route('id');
        $hash = $request->route('hash');

        // Access query string parameters
        $expires = $request->query('expires');
        $signature = $request->query('signature');
        $r = $request;
 //       $a = parent::handle($request, $next);

        return parent::handle($request, $next);
    }
}
