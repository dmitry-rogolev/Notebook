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
        $note->delete();
    }

    /**
     *
     * @param \App\Models\Note $note
     * @return void
     */
    public function restore(Note $note)
    {
        $note->restore();
    }

    /**
     * Delete all
     *
     * @return void
     */
    public function deleteAll()
    {
        Note::whereUserId(request()->user()->id)->delete();
    }

    /**
     * @return void
     */
    public function restoreAll()
    {
        Note::onlyTrashed()->whereUserId(request()->user()->id)->restore();
    }

    public function forceDelete(Note $note) {
        Storage::deleteDirectory('public/' . $note->user_id . '/' . $note->id);
        $note->forceDelete();
    }

    public function forceDeleteAll() {
        Storage::deleteDirectory('public/' . request()->user()->id);
        Note::onlyTrashed()->whereUserId(request()->user()->id)->forceDelete();
    }

    /**
     * Export models from client
     *
     * @param array $notes
     * @return void
     */
    public function export(array $notes) {
        $user = request()->user();
        foreach ($notes as $note) {
            $note['user_id'] = $user->id;
            Note::create($note);
        }
    }

    /**
     * Export models from client
     *
     * @param array $notes
     * @return void
     */
    public function exportTrash(array $notes) {
        $user = request()->user();
        foreach ($notes as $note) {
            $note['user_id'] = $user->id;
            $trashed = Note::create($note);
            $trashed->delete();
        }
    }
}
