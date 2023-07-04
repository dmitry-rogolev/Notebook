<?php

namespace App\Http\Controllers\Note;

use App\Http\Resources\NoteResource;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class IndexController extends BaseController
{
    /**
     *
     * @return \Illuminate\Http\Resources\Json\AnonymousResourceCollection
     */
    public function __invoke(): AnonymousResourceCollection
    {
        return NoteResource::collection($this->service->index());
    }
}
