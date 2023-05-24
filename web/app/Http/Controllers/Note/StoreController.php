<?php

namespace App\Http\Controllers\Note;

use App\Http\Requests\Note\StoreRequest;
use App\Http\Resources\NoteResource;
use Illuminate\Http\Request;

class StoreController extends BaseController
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(StoreRequest $request)
    {
        $validated = $request->validated();

        $note = $this->service->store($validated);

        return new NoteResource($note);
    }
}
