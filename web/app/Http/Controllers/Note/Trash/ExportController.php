<?php

namespace App\Http\Controllers\Note\Trash;

use App\Http\Controllers\Note\Trash\BaseController as Controller;
use App\Http\Requests\Note\ExportRequest;

class ExportController extends Controller
{
    public function __invoke(ExportRequest $request) 
    {
        $notes = $request->validated()['notes'];

        $this->service->exportTrash($notes);

        return response()->noContent();
    }
}
