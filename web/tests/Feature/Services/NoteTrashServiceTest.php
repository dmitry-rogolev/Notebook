<?php

namespace Tests\Feature\Services;

use App\Models\Note;
use App\Models\User;
use App\Services\NoteTrashService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class NoteTrashServiceTest extends TestCase
{
    use RefreshDatabase;
    use WithFaker;

    public function test_index(): void
    {
        $user = User::factory()->create();

        $this->actingAs($user);

        Note::factory(10)->for($user)->trashed()->create();

        $service = app(NoteTrashService::class);

        $notes = $service->index();

        $this->assertCount(10, $notes);
        $this->assertContainsOnly(Note::class, $notes);
        $this->assertTrue($notes->every(fn ($note) => $note->trashed()));
    }

    public function test_show(): void
    {
        $user = User::factory()->create();

        $this->actingAs($user);

        $note = Note::factory()->for($user)->trashed()->create();

        $service = app(NoteTrashService::class);

        $this->assertEquals($note->id, $service->show($note->id)?->id);
        $this->assertTrue($note->trashed());
    }

    public function test_store(): void
    {
        $user = User::factory()->create();

        $this->actingAs($user);

        $service = app(NoteTrashService::class);

        $note = $service->store([
            'title' => $this->faker->text(20), 
            'text' => $this->faker->paragraphs(5, true), 
            'user_id' => $user->id, 
        ]);

        $this->assertModelExists($note);
    }

    public function test_delete(): void
    {
        $user = User::factory()->create();
        $this->actingAs($user);

        $service = app(NoteTrashService::class);

        $note = Note::factory()->for($user)->trashed()->create();

        $service->delete($note->id);

        $this->assertModelMissing($note);
    }

    public function test_truncate(): void
    {
        $user = User::factory()->create();
        $this->actingAs($user);

        $service = app(NoteTrashService::class);

        $notes = Note::factory(10)->for($user)->trashed()->create();

        $service->truncate();

        $notes->each(fn ($note) => $this->assertModelMissing($note));
        $this->assertTrue($notes->fresh()->isEmpty());
    }

    public function test_restore(): void
    {
        $user = User::factory()->create();
        $this->actingAs($user);

        $service = app(NoteTrashService::class);

        $note = Note::factory()->for($user)->trashed()->create();

        $this->assertTrue($note->trashed());

        $service->restore($note->id);

        $note->refresh();

        $this->assertFalse($note->trashed());
    }

    public function test_revert(): void
    {
        $user = User::factory()->create();
        $this->actingAs($user);

        $service = app(NoteTrashService::class);

        $notes = Note::factory(10)->for($user)->trashed()->create();

        $service->revert();

        $this->assertTrue($notes->fresh()->every(fn ($note) => ! $note->trashed()));
    }

    public function test_export(): void
    {
        $user = User::factory()->create();
        $this->actingAs($user);

        $service = app(NoteTrashService::class);

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
        $this->assertTrue($notes->every(fn ($note) => $note->trashed()));
    }
}
