<?php

namespace App\Http\Controllers\Note\Trash;

use App\Http\Controllers\Note\Trash\BaseController as Controller;
use Illuminate\Http\Response;

class DeleteAllController extends Controller
{
    /**
     *
     * @return Illuminate\Http\Response
     */
    public function __invoke(): Response
    {
        $this->service->forceDeleteAll();

        return response()->noContent();
    }
}
