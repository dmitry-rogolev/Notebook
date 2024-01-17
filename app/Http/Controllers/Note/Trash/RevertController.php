<?php

namespace App\Http\Controllers\Note\Trash;

use App\Http\Controllers\Note\Trash\BaseController as Controller;
use App\Http\Resources\NoteResource;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class RevertController extends Controller
{
    /**
     *
     * @return \Illuminate\Http\Resources\Json\AnonymousResourceCollection
     */
    public function __invoke(): AnonymousResourceCollection
    {
        $collection = $this->service->index();

        $this->service->revert();

        return NoteResource::collection($collection->fresh());
    }
}
