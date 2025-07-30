<?php

namespace App\Providers;

use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;
use Illuminate\Support\Facades\URL;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        if (
            app()->environment('production') &&
            request()->header('x-forwarded-proto') === 'https'
        ) {
            URL::forceScheme('https');
        }
        Inertia::share([
            'flash' => function () {
                return [
                    'success' => Session::get('success'),
                ];
            },
        ]);
        Vite::prefetch(concurrency: 3);
    }
}
