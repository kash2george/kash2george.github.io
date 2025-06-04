<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class WordSplit extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'word',
        'part1',
        'part2',
        'part3',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
