<?php

namespace App\Traits;

use App\Contracts\Filter;
use Illuminate\Contracts\Database\Eloquent\Builder;

trait Filterable 
{
    protected $filter;
    
    public function scopeFilter(Builder $builder, Filter $filter)
    {
        $filter->apply($builder);

        return $builder;
    }
}
