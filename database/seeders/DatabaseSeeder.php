<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Device;
use App\Models\ProvisioningJob;
use App\Models\ServicePlan;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create service plans
        ServicePlan::factory()->count(5)->create();

        // Create users with devices and jobs
        User::factory()
            ->count(10)
            ->has(
                Device::factory()
                    ->count(2)
                    ->has(ProvisioningJob::factory()->count(1))
            )
            ->create();
    }
}
