<?php

namespace App\Models;

use App\Traits\Filterable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Scout\Searchable;

class Note extends Model
{
    use HasFactory;
    use Filterable;
    use Searchable;

    protected $fillable = [
        'title', 
        'text', 
        'user_id', 
    ];

    public function user() {
        return $this->belongsTo(User::class);
    }

    public function toSearchableArray()
    {
        return [
            'title' => $this->title, 
            'text' => $this->text, 
        ];
    }
}
