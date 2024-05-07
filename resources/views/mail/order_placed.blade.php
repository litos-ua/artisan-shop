<p>Dear {{ $order->customer->first_name }},</p>

<p>Your order has been successfully placed with the following details:</p>

<p>Ваше замовлення прийнято в обробку</p>
<p>Order ID: {{ $order->order_id }}</p>
<p>Time of Creation: {{$order->created_at}}</p>
<p>Total Amount: ${{ $totalAmount }}</p>

<p>Thank you for shopping with us!</p>
