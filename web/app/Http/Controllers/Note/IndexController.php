<?php

namespace App\Http\Controllers\Note;

use App\Http\Filters\NoteFilter;
use App\Http\Resources\NoteResource;
use App\Models\Note;
use Illuminate\Http\Request;

class IndexController extends BaseController
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        $notes = null;

        if ($request->search) {
            $notes = Note::search($request->search)->where('user_id', $request->user()->id)->get();
        } else {
            $notes = $request->user()->notes()->filter(app(NoteFilter::class))->get();
        }

        return NoteResource::collection($notes);
    }
}
