<?php

namespace App\Http\Filters;

use Illuminate\Database\Eloquent\Builder;

class NoteFilter extends Filter 
{
    public function id(Builder $builder, $value)
    {
        $builder->where('id', $value);
    }

    public function title(Builder $builder, $value)
    {
        $words = str($value)->explode(' ');
        $builder->where(function ($builder) use ($words) {
            $words->each(function ($value) use ($builder) {
                $builder->where('title', 'like', "%{$value}%");
            });
        });
    }

    public function text(Builder $builder, $value)
    {
        $words = str($value)->explode(' ');
        $builder->where(function ($builder) use ($words) {
            $words->each(function ($value) use ($builder) {
                $builder->where('text', 'like', "%{$value}%");
            });
        });
    }

    public function userId(Builder $builder, $value)
    {
        $builder->where('user_id', $value);
    }

    public function createdAt(Builder $builder, $value)
    {
        $builder->where('created_at', '>=', $value);
    }

    public function updatedAt(Builder $builder, $value)
    {
        $builder->where('updated_at', '>=', $value);
    }
}
