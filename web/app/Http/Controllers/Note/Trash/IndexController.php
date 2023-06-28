<?php

namespace App\Http\Controllers\Note\Trash;

use App\Http\Controllers\Note\Trash\BaseController as Controller;
use App\Http\Resources\NoteResource;
use App\Models\Note;
use Illuminate\Http\Request;

class IndexController extends Controller
{
    public function __invoke(Request $request) {
        $notes = Note::onlyTrashed()->whereUserId($request->user()->id)->get();

        return NoteResource::collection($notes);
    }
}
