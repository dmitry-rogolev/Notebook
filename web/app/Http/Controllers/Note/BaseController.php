<?php

namespace App\Http\Controllers\Note;

use App\Http\Controllers\Controller;
use App\Services\NoteService;
use Illuminate\Http\Request;

class BaseController extends Controller
{
    public $service;

    public function __construct(NoteService $service)
    {
        $this->service = $service;
    }
}
