<?php

use App\Http\Controllers\Note\IndexController as NoteIndexController;
use App\Http\Controllers\Note\ShowController as NoteShowController;
use App\Http\Controllers\Note\StoreController as NoteStoreController;
use App\Http\Controllers\Note\UpdateController as NoteUpdateController;
use App\Http\Controllers\Note\DeleteController as NoteDeleteController;
use App\Http\Controllers\Note\DeleteAllController as NoteDeleteAllController;
use App\Http\Controllers\Note\ExportController as NoteExportController;
use App\Http\Controllers\Note\Image\StoreController as ImageStoreController;
use App\Http\Controllers\Note\Image\ShowController as ImageShowController;
use App\Http\Controllers\Note\Trash\IndexController as NoteTrashIndexController;
use App\Http\Controllers\Note\Trash\DeleteController as NoteTrashDeleteController;
use App\Http\Controllers\Note\Trash\DeleteAllController as NoteTrashDeleteAllController;
use App\Http\Controllers\Note\Trash\RestoreController as NoteTrashRestoreController;
use App\Http\Controllers\Note\Trash\RestoreAllController as NoteTrashRestoreAllController;
use App\Http\Controllers\Note\Trash\ExportController as NoteTrashExportController;
use App\Models\Note;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::middleware(['auth:sanctum', config('jetstream.auth_session')])->group(function () {

    Route::name('notes.')->group(function () {

        Route::name('trash.')->prefix('notes')->group(function () {

            Route::get('trash', NoteTrashIndexController::class)
                ->can('viewAny', Note::class)
                ->name('index');

            Route::post('trash/{id}/restore', NoteTrashRestoreController::class)
                ->name('restore');

            Route::delete('trash/{id}', NoteTrashDeleteController::class)
                ->name('delete');

            Route::post('trash/restore', NoteTrashRestoreAllController::class)
                ->name('restore.all');

            Route::delete('trash', NoteTrashDeleteAllController::class)
                ->name('delete.all');
    
            Route::post('trash/export', NoteTrashExportController::class)
                ->name('export');
        });

        Route::name('images.')->prefix('notes/{note}')->group(function () {

            Route::get('images/{name}', ImageShowController::class)
                ->name('show');

            Route::post('images', ImageStoreController::class)
                ->can('update', 'note')
                ->name('store');
    
        });

        Route::get('notes', NoteIndexController::class)
            ->can('viewAny', Note::class)
            ->name('index');

        Route::get('notes/{note}', NoteShowController::class)
            ->can('view', 'note')
            ->name('show');

        Route::post('notes', NoteStoreController::class)
            ->can('create', Note::class)
            ->name('store');

        Route::patch('notes/{note}', NoteUpdateController::class)
            ->can('update', 'note')
            ->name('update');

        Route::delete('notes/{note}', NoteDeleteController::class)
            ->can('delete', 'note')
            ->name('delete');

        Route::delete('notes', NoteDeleteAllController::class)
            ->name('delete.all');

        Route::post('notes/export', NoteExportController::class)
            ->name('export');
    });

});

Route::name('notes.images.')->prefix('notes/{note}')->group(function () {

    Route::get('images/{name}', ImageShowController::class)
        ->name('show');

});
