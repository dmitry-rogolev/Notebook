<?php

namespace App\Services;

use App\Models\Note;
use Illuminate\Support\Facades\Storage;

class NoteService extends Service
{
    /**
     * Create model
     *
     * @param array $data
     * @return \App\Models\Note
     */
    public function store(array $data)
    {
        $note = Note::create($data);

        return $note;
    }

    /**
     * Update model
     *
     * @param \App\Models\Note $note
     * @param array $data
     * @return \App\Models\Note
     */
    public function update(Note $note, array $data)
    {
        $note->fill($data);
        $note->save();
        $note->refresh();

        return $note;
    }

    /**
     * Delete model
     *
     * @param \App\Models\Note $note
     * @return void
     */
    public function delete(Note $note)
    {
        Storage::deleteDirectory('public/' . request()->user()->id . '/' . $note->id);
        $note->delete();
    }

    /**
     * Delete all
     *
     * @return void
     */
    public function deleteAll()
    {
        Storage::deleteDirectory('public/' . request()->user()->id);
        request()->user()->notes()->delete();
    }
}
