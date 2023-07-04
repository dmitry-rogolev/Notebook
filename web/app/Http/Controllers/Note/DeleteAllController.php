<?php

namespace App\Http\Controllers\Note;

use Illuminate\Http\Response;

class DeleteAllController extends BaseController
{
    /**
     *
     * @return \Illuminate\Http\Response
     */
    public function __invoke(): Response
    {
        $this->service->deleteAll();

        return response()->noContent();
    }
}
