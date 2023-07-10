<?php

namespace App\Http\Controllers\Note\Trash;

use App\Http\Controllers\Note\Trash\BaseController as Controller;
use Illuminate\Http\Response;

class DeleteController extends Controller
{
    /**
     *
     * @param integer $id
     * @return \Illuminate\Http\Response
     */
    public function __invoke(int $id): Response
    {
        $this->service->delete($id);

        return response()->noContent();
    }
}
