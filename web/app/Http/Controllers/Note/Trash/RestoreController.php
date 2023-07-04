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
        $note = $this->service->showOnlyTrashed($id);

        if ($note) {
            $this->service->restore($note);

            $note->refresh();
        }

        return new NoteResource($note);
    }
}
