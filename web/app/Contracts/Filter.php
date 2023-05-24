<?php

namespace App\Contracts;

use Illuminate\Database\Eloquent\Builder;

interface Filter 
{
    public function apply(Builder $builder);
}
