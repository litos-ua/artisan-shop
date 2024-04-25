<?php

//namespace App\Http\Controllers\Mail;
//
//use App\Http\Controllers\Controller;
//use App\Models\User;
//use Illuminate\Http\Request;
//use Illuminate\Support\Facades\Auth;
//use function Symfony\Component\Translation\t;
//
//class VerificationController extends Controller
//{
//
//    public function resendVerificationEmail(Request $request)
//    {
//        try {
//            $payload = $request->all();
//            $user = $request->user();
//            $hasSessionCookie = $request->hasCookie('laravel_session');
//            $bearerToken = $request->bearerToken();
//            $authorizationHeader = $request->header('Authorization');
//            $routeParameters = $request->route()->parameters();
//            foreach ($payload as $key => $value) {
//                $user = User::where($key, $value)->first();
//
//                if ($user) {
//                    // Send email verification notification
//                    $user->sendEmailVerificationNotification();
//                    // You may break out of the loop if you only want to handle the first match
//                    break;
//                }
//            }
//            if (Auth::check()) {
//                $authVerification = true;
//            } else {
//                $authVerification = false;
//            }
//            $a =1;
//            return response()->json(['message' => 'Verification link sent!']);
//
//        } catch (\Exception $e) {
//            return response()->json(['error' => 'An error occurred while resending verification email.'], 500);
//        }
//    }
//
//}


namespace App\Http\Controllers\Mail;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class VerificationController extends Controller
{
    public function resendVerificationEmail(Request $request)
    {
        $email = $request->input('email');
        $user = User::where('email', $email)->first();

        if ($user && !$user->hasVerifiedEmail()) {
            $user->sendEmailVerificationNotification();
            return response()->json(['message' => 'Verification link sent!']);
        }

        return response()->json(['message' => 'Email already verified or user not found.']);
    }

    public function handleVerificationLink(Request $request, $id, $hash)
    {
        // Find the user by ID
        $user = User::findOrFail($id);

        // Check if email is already verified
        if ($user->hasVerifiedEmail()) {
            return redirect('/'); // Redirect if email is already verified
        }

        // Check if hash matches
        if (!hash_equals($hash, sha1($user->getEmailForVerification()))) {
            abort(403, 'Invalid verification link');
        }

        // Mark email as verified
        $user->markEmailAsVerified();

        return redirect('http://192.168.0.32:3000/'); // Redirect after verification
    }

}

