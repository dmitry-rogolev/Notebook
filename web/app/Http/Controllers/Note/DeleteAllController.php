<?php

namespace App\Http\Controllers\Note;

class DeleteAllController extends BaseController
{
    /**
     * Handle the incoming request.
     */
    public function __invoke()
    {
        $this->service->deleteAll();

        return response()->noContent();
    }
}
