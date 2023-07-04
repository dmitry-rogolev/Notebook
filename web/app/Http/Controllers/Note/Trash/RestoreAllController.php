<?php

namespace App\Http\Controllers\Note\Trash;

use App\Http\Controllers\Note\Trash\BaseController as Controller;
use App\Http\Resources\NoteResource;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class RestoreAllController extends Controller
{
    /**
     *
     * @return \Illuminate\Http\Resources\Json\AnonymousResourceCollection
     */
    public function __invoke(): AnonymousResourceCollection
    {
        $collection = $this->service->indexOnlyTrashed();

        $this->service->restoreAll();

        $collection = $collection->fresh();

        return NoteResource::collection($collection);
    }
}
