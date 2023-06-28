<?php

namespace App\Http\Controllers\Note\Trash;

use App\Http\Controllers\Note\Trash\BaseController as Controller;
use App\Models\Note;
use Illuminate\Http\Request;

class DeleteController extends Controller
{
    public function __invoke(Request $request, int $id) {
        $note = Note::withTrashed()->whereId($id)->whereUserId($request->user()->id)->first();

        if ($note) {
            $this->service->forceDelete($note);
        }

        return response()->noContent();
    }
}
