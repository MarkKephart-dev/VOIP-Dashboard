<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use App\Models\ProvisioningJob;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ProvisioningJob>
 */
class ProvisioningJobFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = ProvisioningJob::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'device_id' => \App\Models\Device::factory(),
            'status' => fake()->randomElement(['pending', 'processing', 'completed', 'failed']),
            'log' => fake()->optional()->text(100),
            'started_at' => now(),
            'finished_at' => fake()->optional()->dateTimeBetween('now', '+1 hour'),
        ];
    }
}