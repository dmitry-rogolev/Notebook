<?php

namespace App\Http\Controllers\Note;

use App\Models\Note;
use Illuminate\Http\Response;

class DeleteController extends BaseController
{
    /**
     *
     * @param \App\Models\Note $note
     * @return \Illuminate\Http\Response
     */
    public function __invoke(Note $note): Response
    {
        $this->service->delete($note);

        return response()->noContent();
    }
}
