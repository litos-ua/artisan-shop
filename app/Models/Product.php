<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;
    protected $fillable =
        [
            'name',
            'category_id',
            'price',
            'image',
            'item_characteristics',
            'title'
            ];

    protected $casts = [
        'item_characteristics' => 'array',
    ];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function stocks()
    {
        return $this->hasMany(Stock::class);
    }
}
