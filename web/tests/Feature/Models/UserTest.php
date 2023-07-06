<?php

namespace Tests\Feature\Models;

use App\Models\Note;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class UserTest extends TestCase
{
    use RefreshDatabase;

    public function test_user_can_be_created(): void
    {
        $user = User::factory()->create();

        $this->assertModelExists($user);
    }

    public function test_user_can_get_notes(): void
    {
        $user = User::factory()->has(Note::factory()->count(5))->create();

        $this->assertCount(5, $user->notes);
        $this->assertContainsOnly(Note::class, $user->notes);
    }
}
