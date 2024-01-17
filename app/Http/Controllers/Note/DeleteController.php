<?php

namespace App\Http\Controllers\Note;

use App\Http\Resources\NoteResource;
use App\Models\Note;

class DeleteController extends BaseController
{
    /**
     *
     * @param \App\Models\Note $note
     * @return \App\Http\Resources\NoteResource
     */
    public function __invoke(Note $note): NoteResource
    {
        $this->service->delete($note);

        return new NoteResource($note);
    }
}
