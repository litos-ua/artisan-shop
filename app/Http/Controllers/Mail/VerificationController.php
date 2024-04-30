<?php


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

