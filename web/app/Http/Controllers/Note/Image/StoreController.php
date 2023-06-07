<?php

namespace App\Http\Controllers\Note\Image;

use App\Http\Controllers\Note\Image\BaseController as Controller;
use App\Http\Requests\Image\StoreRequest;
use Illuminate\Http\Request;

class StoreController extends Controller
{
    public function __invoke(StoreRequest $request)
    {
        $request->validated();

        $request->file('image')->store($request->user()->id . '/' . $request->route('note')->id, 'public');

        return response()->json([
            'image' => [
                'name' => $request->file('image')->hashName(), 
            ], 
        ]);
    }
}
