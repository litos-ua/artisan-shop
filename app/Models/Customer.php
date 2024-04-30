<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Customer extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'first_name',
        'last_name',
        'email',
        'phone_number',
        'zip_code',
        'address',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function userById()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function userByEmail()
    {
        return $this->belongsTo(User::class, 'email', 'email');
    }
}
