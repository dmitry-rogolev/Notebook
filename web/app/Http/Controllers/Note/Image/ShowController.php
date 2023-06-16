<?php

namespace App\Http\Controllers\Note\Image;

use App\Http\Controllers\Note\Image\BaseController as Controller;
use App\Models\Note;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ShowController extends Controller
{
    public function __invoke(Request $request, Note $note, string $name)
    {
        if (Storage::exists('public/' . $note->user_id . '/' . $note->id . '/' . $name)) {
            return response()->file(Storage::path('public/' . $note->user_id . '/' . $note->id . '/' . $name));
        }

        return response()->json([]);
    }
}
