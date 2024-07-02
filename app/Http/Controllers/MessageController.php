<?php

namespace App\Http\Controllers;

use App\Http\Resources\MessageResource;
use App\Models\Message;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;


class MessageController extends Controller
{
    public function sendMessage(Request $request)
    {
        try {
            $request->validate([
                'receiver_id' => 'required|exists:users,id',
                'message' => 'required|string|min:1', // Ensure message is not empty
            ]);

            $sender = Auth::id();

            $message = Message::create([
                'sender_id' => $sender,
                'receiver_id' => $request->receiver_id,
                'message' => $request->message,
                'read_status' => false,
            ]);

            return response()->json(['success' => true, 'message' => $message]);
        } catch (\Exception $e) {
            Log::error('Error in sendMessage method', [
                'exception' => $e,
                'request' => $request->all(),
            ]);
            return response()->json(['error' => 'Unable to send message'], 500);
        }
    }

    public function getMessages(Request $request)
    {
        try {
            $currentUserId = $request->query('userId') ?? Auth::id();
            $adminId = $request->query('adminId') ?? 3;  // Default to 3 if adminId is not provided

            if ($currentUserId == $adminId) {
                $messages = Message::with(['senderCustomer', 'receiverCustomer'])->get();
            } else {
                $messages = Message::where(function ($query) use ($currentUserId) {
                    $query->where('sender_id', $currentUserId)
                        ->orWhere('receiver_id', $currentUserId);
                })
                    ->with(['senderCustomer', 'receiverCustomer'])
                    ->get();
            }

            return response()->json(['messages' => MessageResource::collection($messages)]);
        } catch (\Exception $e) {
            Log::error('Error in getMessages method', [
                'exception' => $e,
                'request' => $request->all(),
            ]);
            return response()->json(['error' => 'Unable to fetch messages'], 500);
        }
    }
}

//namespace App\Http\Controllers;
//
//use App\Http\Resources\MessageResource;
//use App\Models\Message;
//use Illuminate\Http\Request;
//use Illuminate\Support\Facades\Auth;
//use Illuminate\Support\Facades\Log;
//
//
//class MessageController extends Controller
//{
//    public function sendMessage(Request $request)
//    {
//        $request->validate([
//            'receiver_id' => 'required|exists:users,id',
//            'message' => 'required|string|min:1', // Ensure message is not empty
//        ]);
//
//        $sender = Auth::id();
//
//        $message = Message::create([
//            'sender_id' => $sender,
//            'receiver_id' => $request->receiver_id,
//            'message' => $request->message,
//            'read_status' => false,
//        ]);
//
//        return response()->json(['success' => true, 'message' => $message]);
//    }
//
//
//
//    public function getMessages(Request $request)
//    {
//        $currentUserId = $request->query('userId') ?? Auth::id();
//        $adminId = $request->query('adminId') ?? 3;  // Default to 3 if adminId is not provided
//
//        if ($currentUserId == $adminId) {
//            $messages = Message::with(['senderCustomer', 'receiverCustomer'])->get();
//        } else {
//            $messages = Message::where(function ($query) use ($currentUserId) {
//                $query->where('sender_id', $currentUserId)
//                    ->orWhere('receiver_id', $currentUserId);
//            })
//                ->with(['senderCustomer', 'receiverCustomer'])
//                ->get();
//        }
//
//        return response()->json(['messages' => MessageResource::collection($messages)]);
//    }
//
//
//
//}

