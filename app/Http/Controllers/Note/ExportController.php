<?php

namespace App\Http\Controllers\Note;

use App\Http\Controllers\Note\BaseController as Controller;
use App\Http\Requests\Note\ExportRequest;
use App\Http\Resources\NoteResource;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class ExportController extends Controller
{
    /**
     *
     * @param \App\Http\Requests\Note\ExportRequest $request
     * @return \Illuminate\Http\Resources\Json\AnonymousResourceCollection
     */
    public function __invoke(ExportRequest $request): AnonymousResourceCollection
    {
        $validated = $request->validated();

        $notes = [];

        if (isset($validated['notes']) && is_array($validated['notes'])) {
            $notes = $this->service->export($validated['notes']);
        }

        return NoteResource::collection($notes);
    }
}
