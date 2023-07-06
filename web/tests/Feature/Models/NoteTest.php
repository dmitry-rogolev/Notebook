<?php

namespace Tests\Feature\Models;

use App\Models\Note;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class NoteTest extends TestCase
{
    use RefreshDatabase;

    public function test_note_can_be_created(): void
    {
        $note = Note::factory()->for(User::factory())->create();

        $this->assertModelExists($note);
    }

    public function test_note_can_get_user(): void
    {
        $note = Note::factory()->for(User::factory())->create();

        $this->assertModelExists($note->user);
    }
}
