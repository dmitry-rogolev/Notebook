<?php

namespace App\Http\Controllers\Note\Trash;

use App\Http\Controllers\Note\Trash\BaseController as Controller;
use App\Http\Requests\Note\Trash\StoreRequest;
use App\Http\Resources\NoteResource;

class StoreController extends Controller
{
    /**
     *
     * @param \App\Http\Requests\Note\Trash\StoreRequest $request
     * @return \App\Http\Resources\NoteResource
     */
    public function __invoke(StoreRequest $request): NoteResource
    {
        $validated = $request->validated();

        $note = $this->service->store($validated);

        return new NoteResource($note);
    }
}
