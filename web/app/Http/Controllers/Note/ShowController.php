<?php

namespace App\Http\Controllers\Note;

use App\Http\Resources\NoteResource;
use App\Models\Note;

class ShowController extends BaseController
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Note $note)
    {
        return new NoteResource($note);
    }
}
