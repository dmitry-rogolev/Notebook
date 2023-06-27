<?php

namespace App\Http\Controllers\Note;

use App\Http\Controllers\Note\BaseController as Controller;
use App\Http\Requests\Note\ExportRequest;

class ExportController extends Controller
{
    public function __invoke(ExportRequest $request) 
    {
        $notes = $request->validated()['notes'];

        $this->service->export($notes);

        return response()->noContent();
    }
}
