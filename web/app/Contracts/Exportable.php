<?php

namespace App\Contracts;

use Illuminate\Database\Eloquent\Collection;

interface Exportable
{
    /**
     *
     * @param array $models
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public function export(array $models): Collection;
}
