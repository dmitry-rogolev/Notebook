<?php

namespace App\Http\Controllers\Note;

use App\Http\Resources\NoteResource;
use Illuminate\Http\Request;

class IndexController extends BaseController
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        return NoteResource::collection($request->user()->notes);
    }
}
