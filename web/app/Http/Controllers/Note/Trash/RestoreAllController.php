<?php

namespace App\Http\Controllers\Note\Trash;

use App\Http\Controllers\Note\Trash\BaseController as Controller;
use Illuminate\Http\Request;

class RestoreAllController extends Controller
{
    public function __invoke() {
        $this->service->restoreAll();

        return response()->noContent();
    }
}
