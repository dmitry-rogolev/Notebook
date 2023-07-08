<?php

use App\Http\Controllers\Note\DeleteController;
use App\Http\Controllers\Note\ExportController;
use App\Http\Controllers\Note\IndexController;
use App\Http\Controllers\Note\ShowController;
use App\Http\Controllers\Note\StoreController;
use App\Http\Controllers\Note\TruncateController;
use App\Http\Controllers\Note\UpdateController;
use App\Models\Note;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum', config('jetstream.auth_session')])->name('notes.')->group(function () {
    Route::get('notes', IndexController::class)
        ->can('viewAny', Note::class)
        ->name('index');

    Route::get('notes/{note}', ShowController::class)
        ->can('view', 'note')
        ->where('note', '[0-9]+')
        ->name('show');

    Route::post('notes', StoreController::class)
        ->can('create', Note::class)
        ->name('store');

    Route::patch('notes/{note}', UpdateController::class)
        ->can('update', 'note')
        ->name('update');

    Route::delete('notes/{note}', DeleteController::class)
        ->can('delete', 'note')
        ->name('delete');

    Route::delete('notes', TruncateController::class)
        ->can('truncate', Note::class)
        ->name('truncate');

    Route::post('notes/export', ExportController::class)
        ->can('export', Note::class)
        ->name('export');
});
