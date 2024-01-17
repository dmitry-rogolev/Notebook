<?php

namespace App\Http\Controllers\Note;

use Illuminate\Http\Response;

class TruncateController extends BaseController
{
    /**
     *
     * @return \Illuminate\Http\Response
     */
    public function __invoke(): Response
    {
        $this->service->truncate();

        return response()->noContent();
    }
}
