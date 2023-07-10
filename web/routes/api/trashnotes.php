<?php

use App\Http\Controllers\Note\Trash\DeleteController;
use App\Http\Controllers\Note\Trash\ExportController;
use App\Http\Controllers\Note\Trash\IndexController;
use App\Http\Controllers\Note\Trash\RestoreController;
use App\Http\Controllers\Note\Trash\RevertController;
use App\Http\Controllers\Note\Trash\ShowController;
use App\Http\Controllers\Note\Trash\StoreController;
use App\Http\Controllers\Note\Trash\TruncateController;
use App\Models\Note;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum', config('jetstream.auth_session')])->name('trashnotes.')->group(function () {
    Route::get('trashnotes', IndexController::class)
        ->can('viewAny', Note::class)
        ->name('index');

    Route::get('trashnotes/{id}', ShowController::class)
        ->name('show');

    Route::post('trashnotes', StoreController::class)
        ->name('store');

    Route::patch('trashnotes/{id}', RestoreController::class)
        ->name('restore');

    Route::patch('trashnotes', RevertController::class)
        ->name('revert');

    Route::delete('trashnotes/{id}', DeleteController::class)
        ->name('delete');

    Route::delete('trashnotes', TruncateController::class)
        ->name('truncate');

    Route::post('trashnotes/export', ExportController::class)
        ->name('export');
});
