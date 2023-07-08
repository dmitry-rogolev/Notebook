<?php

namespace App\Services;

use App\Contracts\Exportable;
use App\Models\Note;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

class NoteService extends Service implements Exportable
{
    /**
     *
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public function index(): Collection
    {
        return auth()->user()->notes;
    }

    /**
     *
     * @param int $id
     * @return \App\Models\Note|null
     */
    public function show(int $id): ?Note
    {
        return Note::find($id);
    }

    /**
     *
     * @param array $attributes
     * @return \App\Models\Note
     */
    public function store(array $attributes): Note
    {
        if (! isset($attributes['user_id'])) {
            $attributes['user_id'] = auth()->user()->id;
        }

        return Note::create($attributes);
    }

    /**
     *
     * @param \Illuminate\Database\Eloquent\Model $note
     * @param array $attributes
     * @return \App\Models\Note
     */
    public function update(Model $note, array $attributes): void
    {
        $note->fill($attributes);
        $note->save();
    }

    /**
     *
     * @param \Illuminate\Database\Eloquent\Model $note
     * @return void
     */
    public function delete(Model $note): void
    {
        $note->delete();
    }

    /**
     *
     * @return void
     */
    public function truncate(): void
    {
        auth()->user()->notes()->delete();
    }

    /**
     *
     * @param array $notes
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public function export(array $notes): Collection
    {
        $user = auth()->user();
        $collection = new Collection();

        foreach ($notes as $note) {
            if (! isset($note['user_id'])) {
                $note['user_id'] = $user->id;
            }

            $collection->push(Note::create($note));
        }

        return $collection;
    }
}
