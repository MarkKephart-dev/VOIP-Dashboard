<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use App\Models\ServicePlan;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ServicePlan>
 */
class ServicePlanFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = ServicePlan::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->word() . ' Plan',
            'description' => fake()->sentence(),
            'price' => fake()->randomFloat(2, 10, 100),
        ];
    }
}