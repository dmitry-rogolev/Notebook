<?php

namespace App\Services;

use App\Models\Note;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\Storage;

class NoteService extends Service
{
    /**
     *
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public function index(): Collection
    {
        return request()->user()->notes;
    }

    /**
     *
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public function indexOnlyTrashed(): Collection
    {
        return Note::onlyTrashed()->whereUserId(request()->user()->id)->get();
    }

    /**
     *
     * @param \App\Models\Note $note
     * @return \App\Models\Note
     */
    public function show(Note $note): Note
    {
        return $note;
    }

    /**
     *
     * @param integer $id
     * @return \App\Models\Note|null
     */
    public function showOnlyTrashed(int $id): ?Note
    {
        return Note::onlyTrashed()
            ->whereId($id)
            ->whereUserId(request()->user()->id)
            ->first();
    }

    /**
     *
     * @param array $attributes
     * @return \App\Models\Note
     */
    public function store(array $attributes): Note
    {
        return Note::create($attributes);
    }

    /**
     *
     * @param \App\Models\Note $note
     * @param array $data
     * @return \App\Models\Note
     */
    public function update(Note $note, array $attributes): void
    {
        $note->fill($attributes);
        $note->save();
    }

    /**
     *
     * @param \App\Models\Note $note
     * @return void
     */
    public function delete(Note $note): void
    {
        $note->delete();
    }

    /**
     *
     * @param \App\Models\Note $note
     * @return void
     */
    public function restore(Note $note): void
    {
        $note->restore();
    }

    /**
     *
     * @return void
     */
    public function deleteAll(): void
    {
        Note::whereUserId(request()->user()->id)->delete();
    }

    /**
     * 
     * @return void
     */
    public function restoreAll(): void
    {
        Note::onlyTrashed()->whereUserId(request()->user()->id)->restore();
    }

    /**
     *
     * @param \App\Models\Note $note
     * @return void
     */
    public function forceDelete(Note $note): void
    {
        Storage::deleteDirectory('public/' . $note->user_id . '/' . $note->id);
        $note->forceDelete();
    }

    /**
     *
     * @return void
     */
    public function forceDeleteAll(): void
    {
        Storage::deleteDirectory('public/' . request()->user()->id);
        Note::onlyTrashed()->whereUserId(request()->user()->id)->forceDelete();
    }

    /**
     *
     * @param array $notes
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public function export(array $notes): Collection
    {
        $user = request()->user();
        $collection = new Collection();

        foreach ($notes as $note) {
            $note['user_id'] = $user->id;
            $collection->push(Note::create($note));
        }

        return $collection;
    }

    /**
     *
     * @param array $notes
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public function exportTrash(array $notes) 
    {
        $user = request()->user();
        $collection = new Collection();

        foreach ($notes as $note) {
            $note['user_id'] = $user->id;
            $trashed = Note::create($note);
            $trashed->delete();
            $collection->push($trashed);
        }

        return $collection;
    }
}
