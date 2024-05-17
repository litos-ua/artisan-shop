<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class OrderResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param \Illuminate\Http\Request $request
     * @return array
     */
    public function toArray($request)
    {
        // Ensure order_details is always an array
        $orderDetails = $this->whenLoaded('orderDetails', []);

        // Calculate the total amount
        $totalAmount = collect($this->orderDetails)->reduce(function ($carry, $item) {
            return $carry + ($item->quantity * $item->price);
        }, 0);

        return [
            'id' => $this->id,
            'customer_id' => $this->customer_id,
            'delivery_requirement' => $this->delivery_requirement,
            'received_status' => $this->received_status,
            'type_of_payment' => $this->type_of_payment,
            'advance_payment' => $this->advance_payment,
            'payment_status' => $this->payment_status,
            'customer_notes' => $this->customer_notes,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'order_details' => OrderDetailResource::collection($this->whenLoaded('orderDetails')),
            'total_amount' => $totalAmount,
        ];
    }


}
