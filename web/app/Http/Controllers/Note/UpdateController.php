<?php

namespace App\Http\Controllers\Note;

use App\Http\Requests\Note\UpdateRequest;
use App\Http\Resources\NoteResource;
use App\Models\Note;

class UpdateController extends BaseController
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(UpdateRequest $request, Note $note)
    {
        $validated = $request->validated();

        $note = $this->service->update($note, $validated);

        return new NoteResource($note);
    }
}
