<?php

namespace App\Contracts;

interface Restorable
{
    /**
     *
     * @param integer $id
     * @return void
     */
    public function restore(int $id): void;

    /**
     *
     * @return void
     */
    public function revert(): void;
}
