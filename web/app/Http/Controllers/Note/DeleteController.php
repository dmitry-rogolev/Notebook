<?php

namespace App\Http\Controllers\Note;

use App\Models\Note;

class DeleteController extends BaseController
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Note $note)
    {
        $this->service->delete($note);

        return response()->noContent();
    }
}
