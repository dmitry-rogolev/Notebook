<?php

namespace App\Http\Controllers\Note;

use App\Http\Controllers\Controller;
use App\Services\NoteService;

class BaseController extends Controller
{
    /**
     * @var \App\Services\NoteService
     */
    protected NoteService $service;

    /**
     *
     * @param \App\Services\NoteService $service
     */
    public function __construct(NoteService $service)
    {
        $this->service = $service;
    }
}
