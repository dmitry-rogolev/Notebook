<?php

namespace App\Http\Controllers\Note\Trash;

use App\Http\Controllers\Note\Trash\BaseController as Controller;

class DeleteAllController extends Controller
{
    public function __invoke() {
        $this->service->forceDeleteAll();

        return response()->noContent();
    }
}
