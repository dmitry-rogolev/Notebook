<?php

namespace App\Contracts;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

interface Servicable
{
    /**
     *
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public function index(): Collection;

    /**
     *
     * @param integer $id
     * @return \Illuminate\Database\Eloquent\Model
     */
    public function show(int $id): Model;

    /**
     *
     * @param array $attributes
     * @return \Illuminate\Database\Eloquent\Model
     */
    public function store(array $attributes): Model;

    /**
     *
     * @param array $attributes
     * @return \Illuminate\Database\Eloquent\Model
     */
    public function update(Model $model, array $attributes): void;

    /**
     *
     * @param \Illuminate\Database\Eloquent\Model $model
     * @return void
     */
    public function delete(Model $model): void;

    /**
     *
     * @return void
     */
    public function truncate(): void;
}
