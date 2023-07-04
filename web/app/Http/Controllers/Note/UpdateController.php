<?php

namespace App\Http\Controllers\Note;

use App\Http\Requests\Note\UpdateRequest;
use App\Http\Resources\NoteResource;
use App\Models\Note;

class UpdateController extends BaseController
{
    /**
     *
     * @param \App\Http\Requests\Note\UpdateRequest $request
     * @param \App\Models\Note $note
     * @return \App\Http\Resources\NoteResource
     */
    public function __invoke(UpdateRequest $request, Note $note): NoteResource
    {
        $validated = $request->validated();

        $this->service->update($note, $validated);

        $note->refresh();

        return new NoteResource($note);
    }
}
