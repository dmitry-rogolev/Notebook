<?php

namespace Tests\Feature\Routes;

use App\Models\Note;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Testing\Fluent\AssertableJson;
use Tests\TestCase;

class NoteTrashTest extends TestCase
{
    use RefreshDatabase;
    use WithFaker;

    public function test_index(): void
    {
        $user = User::factory()->create();
        $this->actingAs($user);

        $notes = Note::factory(10)->for($user)->trashed()->create();

        $response = $this->getJson('/api/trashnotes');
        $response->assertStatus(200);

        $response->assertJson(fn (AssertableJson $json) => 
            $json
                ->has('data', 10)
                ->has('data.0', fn ($json) => 
                    $json
                        ->where('id', $notes->first()->id)
                        ->where('title', $notes->first()->title)
                        ->where('text', $notes->first()->text)
                        ->where('created_at', $notes->first()->created_at->toJson())
                        ->where('updated_at', $notes->first()->updated_at->toJson())
                        ->where('deleted_at', $notes->first()->deleted_at->toJson())
                )
        );
    }

    public function test_show(): void
    {
        $user = User::factory()->create();
        $this->actingAs($user);

        $note = Note::factory()->for($user)->trashed()->create();

        $response = $this->getJson("/api/trashnotes/{$note->id}");
        $response->assertStatus(200);

        $response->assertJson(fn (AssertableJson $json) => 
            $json
                ->has('data', fn ($json) => 
                    $json
                        ->where('id', $note->id)
                        ->where('title', $note->title)
                        ->where('text', $note->text)
                        ->where('created_at', $note->created_at->toJson())
                        ->where('updated_at', $note->updated_at->toJson())
                        ->where('deleted_at', $note->deleted_at->toJson())    
                )
        );
    }

    public function test_store(): void
    {
        $user = User::factory()->create();
        $this->actingAs($user);

        $note = Note::factory()->for($user)->make();

        $response = $this->postJson('/api/notes', [
            'title' => $note->title, 
            'text' => $note->text, 
        ]);
        $response->assertStatus(201);

        $response->assertJson(fn (AssertableJson $json) => 
            $json
                ->has('data', fn ($json) => 
                    $json
                        ->where('title', $note->title)
                        ->where('text', $note->text)
                        ->etc()
                )
        );
    }

    public function test_update(): void
    {
        $user = User::factory()->create();
        $this->actingAs($user);

        $note = Note::factory()->for($user)->create();

        $attributes = [
            'title' => $this->faker->text(20), 
            'text' => $this->faker->paragraphs(5, true), 
        ];

        $response = $this->patchJson("/api/notes/{$note->id}", $attributes);
        $response->assertStatus(200);

        $response->assertJson(fn (AssertableJson $json) => 
            $json
                ->has('data', fn ($json) => 
                    $json
                        ->where('id', $note->id)
                        ->where('title', $attributes['title'])
                        ->where('text', $attributes['text'])
                        ->where('created_at', $note->created_at->toJson())
                        ->where('updated_at', $note->updated_at->toJson())
                        ->where('deleted_at', null)  
                )
        );
    }

    public function test_delete(): void
    {
        $user = User::factory()->create();
        $this->actingAs($user);

        $note = Note::factory()->for($user)->create();

        $response = $this->deleteJson("/api/notes/{$note->id}");
        $response->assertStatus(204);

        $this->assertTrue($note->fresh()->trashed());
    }

    public function test_truncate(): void
    {
        $user = User::factory()->create();
        $this->actingAs($user);

        $notes = Note::factory(10)->for($user)->create();

        $response = $this->deleteJson('/api/notes');
        $response->assertStatus(204);

        $this->assertTrue($notes->fresh()->every(fn ($note) => $note->trashed()));
    }

    public function test_export(): void
    {
        $user = User::factory()->create();
        $this->actingAs($user);

        $notes = collect();

        for ($i = 0; $i < 10; $i++) {
            $notes->push([
                'title' => $this->faker->text(20), 
                'text' => $this->faker->paragraphs(5, true), 
            ]);
        }

        $response = $this->postJson('/api/notes/export', [ 'notes' => $notes->toArray() ]);
        $response->assertStatus(200);

        $response->assertJson(fn (AssertableJson $json) => 
            $json
                ->has('data', 10)
                ->has('data.0', fn ($json) => 
                    $json
                        ->where('title', $notes[0]['title'])
                        ->where('text', $notes[0]['text'])
                        ->etc()
                )
        );
    }
}
