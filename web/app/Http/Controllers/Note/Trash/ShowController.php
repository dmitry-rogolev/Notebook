<?php

namespace App\Http\Controllers\Note\Trash;

use App\Http\Controllers\Note\Trash\BaseController as Controller;
use App\Http\Resources\NoteResource;

class ShowController extends Controller
{
    public function __invoke(int $id): NoteResource
    {
        $note = $this->service->show($id);

        if ($note === null) {
            abort(404);
        }

        return new NoteResource($note);
    }
}
