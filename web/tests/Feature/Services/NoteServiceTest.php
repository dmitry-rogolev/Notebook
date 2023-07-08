<?php

namespace Tests\Feature\Services;

use App\Models\Note;
use App\Models\User;
use App\Services\NoteService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class NoteServiceTest extends TestCase
{
    use RefreshDatabase;
    use WithFaker;

    public function test_index(): void
    {
        $user = User::factory()->create();

        $this->actingAs($user);

        Note::factory(10)->for($user)->create();

        $service = app(NoteService::class);

        $notes = $service->index();

        $this->assertCount(10, $notes);
        $this->assertContainsOnly(Note::class, $notes);
    }

    public function test_show(): void
    {
        $user = User::factory()->create();

        $this->actingAs($user);

        $note = Note::factory()->for($user)->create();

        $service = app(NoteService::class);

        $this->assertEquals($note->id, $service->show($note->id)?->id);
    }

    public function test_store(): void
    {
        $user = User::factory()->create();

        $this->actingAs($user);

        $service = app(NoteService::class);

        $note = $service->store([
            'title' => $this->faker->text(20), 
            'text' => $this->faker->paragraphs(5, true), 
            'user_id' => $user->id, 
        ]);

        $this->assertModelExists($note);
    }

    public function test_update(): void
    {
        $user = User::factory()->create();

        $this->actingAs($user);

        $service = app(NoteService::class);

        $note = Note::factory()->for($user)->create();

        $oldNote = clone $note;

        $attributes = [
            'title' => $this->faker->text(20), 
            'text' => $this->faker->paragraphs(4, true), 
        ];

        $service->update($note, $attributes);

        $this->assertNotEquals($oldNote->title, $note->title);
        $this->assertNotEquals($oldNote->text, $note->text);
    }

    public function test_delete(): void
    {
        $user = User::factory()->create();
        $this->actingAs($user);

        $service = app(NoteService::class);

        $note = Note::factory()->for($user)->create();

        $service->delete($note);

        $this->assertTrue($note->trashed());
    }

    public function test_truncate(): void
    {
        $user = User::factory()->create();
        $this->actingAs($user);

        $service = app(NoteService::class);

        $notes = Note::factory(10)->for($user)->create();

        $service->truncate();

        $this->assertTrue($notes->fresh()->every(fn ($note) => $note->trashed()));
    }

    public function test_export(): void
    {
        $user = User::factory()->create();
        $this->actingAs($user);

        $service = app(NoteService::class);

        $export = collect();

        for ($i = 0; $i < 10; $i++) {
            $export->push([
                'title' => $this->faker->text(20), 
                'text' => $this->faker->paragraphs(5, true), 
                'user_id' => $user->id, 
            ]);
        }

        $notes = $service->export($export->toArray());

        $this->assertContainsOnly(Note::class, $notes);
    }
}
