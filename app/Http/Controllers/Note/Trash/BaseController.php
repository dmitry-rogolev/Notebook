<?php

namespace App\Http\Controllers\Note\Trash;

use App\Http\Controllers\Controller;
use App\Services\NoteTrashService;

class BaseController extends Controller
{
    /**
     * @var \App\Services\NoteTrashService
     */
    protected NoteTrashService $service;

    /**
     *
     * @param \App\Services\NoteTrashService $service
     */
    public function __construct(NoteTrashService $service)
    {
        $this->service = $service;
    }
}
