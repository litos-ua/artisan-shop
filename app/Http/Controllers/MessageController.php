<?php

namespace App\Http\Controllers;

use App\Http\Resources\MessageResource;
use App\Models\Message;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class MessageController extends Controller
{
    public function sendMessage(Request $request)
    {
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
    }

//    public function getMessages()
//    {
//        $currentUserId = Auth::id();
//        $userId = 3;
//        $messages = Message::where(function ($query) use ($currentUserId, $userId) {
//            $query->where('sender_id', $currentUserId)
//                ->where('receiver_id', $userId);
//        })->orWhere(function ($query) use ($currentUserId, $userId) {
//            $query->where('sender_id', $userId)
//                ->where('receiver_id', $currentUserId);
//        })->get();
//
//        return response()->json(['messages' => $messages]);
//    }

//    public function getMessages(Request $request)
//    {
//        $currentUserId = Auth::id();
//        $userId = $request->query('userId');
//        $adminId = $request->query('adminId')?? 3;
//
//        $messages = Message::where(function ($query) use ($currentUserId, $userId, $adminId) {
//            $query->where('sender_id', $currentUserId)
//                ->where('receiver_id', $adminId)
//                ->orWhere('sender_id', $adminId)
//                ->where('receiver_id', $currentUserId);
//        })->orWhere(function ($query) use ($currentUserId, $userId, $adminId) {
//            $query->where('sender_id', $adminId)
//                ->where('receiver_id', $currentUserId)
//                ->orWhere('sender_id', $currentUserId)
//                ->where('receiver_id', $adminId);
//        })->get();
//
//        return response()->json(['messages' => $messages]);
//    }


//    public function getMessages(Request $request)
//    {
//        $currentUserId = $request->query('userId') ?? Auth::id();
//        $adminId = $request->query('adminId') ?? 3;  // Default to 3 if adminId is not provided
//
//        // Check if the current user is the admin
//        if ($currentUserId == $adminId) {
//            // If the current user is the admin, fetch all messages
//            $messages = Message::all();
//        } else {
//            // Otherwise, fetch messages where the current user is the sender or receiver
//            $messages = Message::where(function ($query) use ($currentUserId) {
//                $query->where('sender_id', $currentUserId)
//                    ->orWhere('receiver_id', $currentUserId);
//            })->get();
//        }
//
//        return response()->json(['messages' => $messages]);
//    }

//    public function getMessages(Request $request)
//    {
//        $currentUserId = $request->query('userId') ?? Auth::id();
//        $adminId = $request->query('adminId') ?? 3;  // Default to 3 if adminId is not provided
//
//        // Check if the current user is the admin
//        if ($currentUserId == $adminId) {
//            // If the current user is the admin, fetch all messages with sender and receiver details
//            $messages = Message::with(['sender.customers', 'receiver.customers'])->get();
//        } else {
//            // Otherwise, fetch messages where the current user is the sender or receiver
//            $messages = Message::where(function ($query) use ($currentUserId) {
//                $query->where('sender_id', $currentUserId)
//                    ->orWhere('receiver_id', $currentUserId);
//            })->with(['sender.customers', 'receiver.customers'])->get();
//        }
//        $resp = response()->json(['messages' => MessageResource::collection($messages)]);
//
//        return response()->json(['messages' => MessageResource::collection($messages)]);
//    }

//    public function getMessages(Request $request)
//    {
//        $currentUserId = $request->query('userId') ?? Auth::id();
//        $adminId = $request->query('adminId') ?? 3;  // Default to 3 if adminId is not provided
//
//        // Check if the current user is the admin
//        if ($currentUserId == $adminId) {
//            // If the current user is the admin, fetch all messages with sender and receiver details
//            $messages = Message::with(['sender.customers', 'receiver.customers'])
//                ->orderBy('created_at', 'desc')
//                ->get();
//        } else {
//            // Otherwise, fetch messages where the current user is the sender or receiver
//            $messages = Message::where(function ($query) use ($currentUserId, $adminId) {
//                $query->where('sender_id', $currentUserId)
//                    ->where('receiver_id', $adminId)
//                    ->orWhere('sender_id', $adminId)
//                    ->where('receiver_id', $currentUserId);
//            })->orWhere(function ($query) use ($currentUserId, $adminId) {
//                $query->where('sender_id', $adminId)
//                    ->where('receiver_id', $currentUserId)
//                    ->orWhere('sender_id', $currentUserId)
//                    ->where('receiver_id', $adminId);
//            })
//                ->with(['sender.customers', 'receiver.customers'])
//                ->orderBy('created_at', 'desc')
//                ->get();
//        }
//        $resp = response()->json(['messages' => MessageResource::collection($messages)]);
//        return response()->json(['messages' => MessageResource::collection($messages)]);
//    }

    public function getMessages(Request $request)
    {
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
    }



}

