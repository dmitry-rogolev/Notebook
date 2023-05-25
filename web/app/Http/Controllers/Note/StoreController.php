<?php

namespace App\Http\Controllers\Note;

use App\Http\Requests\Note\StoreRequest;
use App\Http\Resources\NoteResource;

class StoreController extends BaseController
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(StoreRequest $request)
    {
        $validated = $request->validated();

        $validated['user_id'] = $request->user()->id;

        $note = $this->service->store($validated);

        return new NoteResource($note);
    }
}
