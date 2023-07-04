<?php

namespace App\Http\Controllers\Note;

use App\Http\Controllers\Note\BaseController as Controller;
use App\Http\Requests\Note\ExportRequest;
use Illuminate\Http\Response;

class ExportController extends Controller
{
    /**
     *
     * @param \App\Http\Requests\Note\ExportRequest $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(ExportRequest $request): Response
    {
        $validated = $request->validated();

        if (isset($validated['notes']) && is_array($validated['notes'])) {
            $this->service->export($validated['notes']);
        }

        return response()->noContent();
    }
}
