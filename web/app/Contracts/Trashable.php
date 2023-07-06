<?php

namespace App\Contracts;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

interface Trashable
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
     * @param integer $id
     * @return void
     */
    public function delete(int $id): void;

    /**
     *
     * @return void
     */
    public function truncate(): void;
}
