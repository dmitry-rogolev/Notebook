<?php

namespace App\Http\Controllers\Note\Trash;

use App\Http\Controllers\Note\Trash\BaseController as Controller;
use App\Http\Resources\NoteResource;

class RestoreController extends Controller
{
    /**
     *
     * @param integer $id
     * @return \App\Http\Resources\NoteResource
     */
    public function __invoke(int $id): NoteResource
    {
        $note = $this->service->show($id);

        if ($note === null) {
            abort(404);
        }

        $this->service->restore($id);

        $note->refresh();

        return new NoteResource($note);
    }
}
