<?php

namespace App\Services;

use App\Contracts\Exportable;
use App\Contracts\Restorable;
use App\Models\Note;
use Illuminate\Database\Eloquent\Collection;

class NoteTrashService extends TrashService implements Restorable, Exportable
{
    /**
     *
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public function index(): Collection
    {
        return Note::onlyTrashed()->whereUserId(request()->user()->id)->get();
    }

    /**
     *
     * @param integer $id
     * @return \App\Models\Note
     */
    public function show(int $id): Note
    {
        return Note::onlyTrashed()->whereId($id)->first();
    }

    /**
     *
     * @param array $attributes
     * @return \App\Models\Note
     */
    public function store(array $attributes): Note
    {
        $note = Note::create($attributes);

        $note->delete();

        return $note;
    }

    /**
     *
     * @param integer $id
     * @return void
     */
    public function delete(int $id): void 
    {
        Note::onlyTrashed()->whereUserId(request()->user()->id)->whereId($id)->forceDelete();
    }

    /**
     *
     * @return void
     */
    public function truncate(): void
    {
        Note::onlyTrashed()->whereUserId(request()->user()->id)->forceDelete();
    }

    /**
     *
     * @param integer $id
     * @return void
     */
    public function restore(int $id): void
    {
        Note::onlyTrashed()->whereId($id)->whereUserId(request()->user()->id)->restore();
    }

    /**
     *
     * @return void
     */
    public function revert(): void
    {
        Note::onlyTrashed()->whereUserId(request()->user()->id)->restore();
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
            $trashed = Note::create($note);
            $trashed->delete();
            $collection->push($trashed);
        }

        return $collection;
    }
}
