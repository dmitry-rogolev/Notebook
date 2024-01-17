<?php

namespace App\Http\Controllers\Note;

use App\Http\Resources\NoteResource;
use App\Models\Note;

class ShowController extends BaseController
{
    /**
     *
     * @param \App\Models\Note $note
     * @return \App\Http\Resources\NoteResource
     */
    public function __invoke(Note $note): NoteResource
    {
        return new NoteResource($note);
    }
}
