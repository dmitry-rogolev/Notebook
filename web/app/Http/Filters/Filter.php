<?php 

namespace App\Http\Filters;

use App\Contracts\Filter as FilterContract;
use Illuminate\Database\Eloquent\Builder;

abstract class Filter implements FilterContract
{
    private $queryParams;

    public function __construct(array $queryParams = [])
    {
        $this->queryParams = $queryParams ? collect($queryParams) : collect(request()->all());
    }

    public function apply(Builder $builder)
    {
        foreach ($this->queryParams as $key => $value) {
            $method = str($key)->camel()->toString();
            if (method_exists($this, $method)) {
                $this->$method($builder, $value);
            }
        }
    }
}
