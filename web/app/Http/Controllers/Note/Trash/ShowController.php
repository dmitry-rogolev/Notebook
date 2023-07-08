<?php

namespace App\Http\Controllers\Note\Trash;

use App\Http\Controllers\Note\Trash\BaseController as Controller;
use App\Http\Resources\NoteResource;
use App\Models\Note;

class ShowController extends Controller
{
    public function __invoke(Note $note): NoteResource
    {
        dd($note);
        return new NoteResource($note);
    }
}
