<?php

namespace App\Http\Controllers\Note\Trash;

use App\Http\Controllers\Note\Trash\BaseController as Controller;
use App\Http\Requests\Note\ExportRequest;
use App\Http\Resources\NoteResource;
use Illuminate\Database\Eloquent\Collection;
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

        $collection = new Collection();

        if (isset($validated['notes']) && is_array($validated['notes'])) {
            $collection = $this->service->exportTrash($validated['notes']);
        }

        return NoteResource::collection($collection);
    }
}
