<?php

use App\Http\Controllers\Note\IndexController as NoteIndexController;
use App\Http\Controllers\Note\ShowController as NoteShowController;
use App\Http\Controllers\Note\StoreController as NoteStoreController;
use App\Http\Controllers\Note\UpdateController as NoteUpdateController;
use App\Http\Controllers\Note\DeleteController as NoteDeleteController;
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
    });

});
