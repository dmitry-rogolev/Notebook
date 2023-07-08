<?php

use App\Http\Controllers\Note\Trash\IndexController;
use App\Http\Controllers\Note\Trash\ShowController;
use App\Models\Note;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum', config('jetstream.auth_session')])->name('trashnotes.')->group(function () {
    Route::get('trashnotes', IndexController::class)
        ->can('viewAny', Note::class)
        ->name('index');

    Route::get('trashnotes/{note}', ShowController::class)
        ->withTrashed()
        ->name('show');
});
