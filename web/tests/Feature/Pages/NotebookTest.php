<?php

namespace Tests\Feature\Pages;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class NotebookTest extends TestCase
{
    use RefreshDatabase;

    public function test_notebook_screen_can_be_rendered(): void
    {
        $response = $this->get('/');
        
        $response->assertStatus(200);
    }
}
