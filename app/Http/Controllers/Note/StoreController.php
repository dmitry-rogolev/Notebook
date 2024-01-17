<?php

namespace App\Http\Controllers\Note;

use App\Http\Requests\Note\StoreRequest;
use App\Http\Resources\NoteResource;

class StoreController extends BaseController
{
    /**
     *
     * @param \App\Http\Requests\Note\StoreRequest $request
     * @return \App\Http\Resources\NoteResource
     */
    public function __invoke(StoreRequest $request): NoteResource
    {
        $validated = $request->validated();

        $note = $this->service->store($validated);

        return new NoteResource($note);
    }
}
