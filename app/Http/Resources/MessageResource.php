<?php

namespace App\Http\Resources;

use App\Models\Customer;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class MessageResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray(Request $request)
    {

        return [
            'id' => $this->id,
            'message' => $this->message,
            'read_status' => $this->read_status,
            'sender_id' => $this->sender_id,
            'receiver_id' => $this->receiver_id,
            'customers' => CustomerResource::collection(Customer::all() ?? []),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'sender_first_name' => $this->senderCustomer ? $this->senderCustomer->first_name : 'Unknown',
            'sender_last_name' => $this->senderCustomer ? $this->senderCustomer->last_name : 'Unknown',
            'receiver_first_name' => $this->receiverCustomer ? $this->receiverCustomer->first_name : 'Unknown',
            'receiver_last_name' => $this->receiverCustomer ? $this->receiverCustomer->last_name : 'Unknown',
        ];
    }
}


