<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Session;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Device;
use App\Models\User;
use App\Models\ServicePlan;
use App\Models\ProvisioningJob;

Route::get('/', function () {
    return Inertia::render('Dashboard', [
        'auth' => [
            'user' => Auth::user(),
        ],
    ]);
})->middleware(['auth', 'verified']);

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

// List users
Route::get('/users', function () {
    return Inertia::render('Users/Index', [
        'users' => User::all(['id', 'name', 'email']),
    ]);
})->middleware(['auth'])->name('users');

// Show form to create a user
Route::get('/users/create', function () {
    return Inertia::render('Users/Create');
})->middleware(['auth'])->name('users.create');

// Store user
Route::post('/users', function (Request $request) {
    $validated = $request->validate([
        'name' => 'required|string|max:255',
        'email' => 'required|email|unique:users,email',
        'password' => 'required|string|min:8|confirmed',
    ]);

    User::create([
        'name' => $validated['name'],
        'email' => $validated['email'],
        'password' => bcrypt($validated['password']),
    ]);

    return redirect()->route('users')->with('success', 'User created!');
})->middleware(['auth'])->name('users.store');

// Show form to edit
Route::get('/users/{user}/edit', function (User $user) {
    return Inertia::render('Users/Edit', [
        'user' => $user,
    ]);
})->middleware(['auth'])->name('users.edit');

// Update user
Route::put('/users/{user}', function (Request $request, User $user) {
    $validated = $request->validate([
        'name' => 'required|string|max:255',
        'email' => 'required|email|unique:users,email,' . $user->id,
    ]);

    $user->update($validated);

    return redirect()->route('users')->with('success', 'User updated!');
})->middleware(['auth'])->name('users.update');

// Delete user
Route::delete('/users/{user}', function (User $user) {
    $user->delete();
    return redirect()->route('users')->with('success', 'User deleted!');
})->middleware(['auth'])->name('users.destroy');

// Display all devices
Route::get('devices', function () {
    return Inertia::render('Devices', [
        'devices' => Device::with('user')->get(),
        'auth' => [
            'user' => Auth::user(),
        ],
    ]);
})->middleware(['auth', 'verified'])->name('devices');

// Delete a device
Route::delete('/devices/{device}', function (Device $device) {
    $device->delete();

    return Redirect::route('devices');
})->middleware(['auth'])->name('devices.destroy');

// Show form for adding new device
Route::get('/devices/new', function () {
    return Inertia::render('Devices/CreateDevice', [
        'users' => User::select('id', 'name')->get(),
    ]);
})->middleware(['auth']);

// Handle form submission of new device
Route::post('/devices', function (Request $request) {
    $validated = $request->validate([
        'user_id' => 'nullable|exists:users,id',
        'mac_address' => 'required|string|max:255|unique:devices,mac_address',
        'model' => 'required|string|max:255',
        'status' => 'required|string|in:active,inactive,provisioned',
    ]);

    \App\Models\Device::create($validated);

    return Redirect::route('devices');
})->middleware(['auth']);

// Show form for editing a device
Route::get('/devices/{device}/edit', function (\App\Models\Device $device) {
    return Inertia::render('Devices/EditDevice', [
        'device' => $device,
        'users' => \App\Models\User::select('id', 'name')->get(),
    ]);
})->middleware(['auth'])->name('devices.edit');

// Handle form submission of edited device
Route::put('/devices/{device}', function (\Illuminate\Http\Request $request, \App\Models\Device $device) {
    $validated = $request->validate([
        'user_id' => 'nullable|exists:users,id',
        'mac_address' => 'required|string|max:255|unique:devices,mac_address,' . $device->id,
        'model' => 'required|string|max:255',
        'status' => 'required|string|in:active,inactive,provisioned',
    ]);

    $device->update($validated);

    // Flash a success message to the session
    Session::flash('success', 'Device updated successfully.');

    return redirect()->route('devices');
})->middleware(['auth'])->name('devices.update');

// List service plans
Route::get('/plans', function () {
    return Inertia::render('Plans/Index', [
        'plans' => ServicePlan::all(['id', 'name', 'description', 'price']),
    ]);
})->middleware(['auth'])->name('plans');

// Show create form
Route::get('/plans/create', function () {
    return Inertia::render('Plans/Create');
})->middleware(['auth'])->name('plans.create');

// Store plan
Route::post('/plans', function (Request $request) {
    $validated = $request->validate([
        'name' => 'required|string|max:255',
        'description' => 'nullable|string',
        'price' => 'required|numeric|min:0',
    ]);

    ServicePlan::create($validated);

    return redirect()->route('plans')->with('success', 'Service Plan created!');
})->middleware(['auth'])->name('plans.store');

// Show edit form
Route::get('/plans/{plan}/edit', function (ServicePlan $plan) {
    return Inertia::render('Plans/Edit', ['plan' => $plan]);
})->middleware(['auth'])->name('plans.edit');

// Update
Route::put('/plans/{plan}', function (Request $request, ServicePlan $plan) {
    $validated = $request->validate([
        'name' => 'required|string|max:255',
        'description' => 'nullable|string',
        'price' => 'required|numeric|min:0',
    ]);

    $plan->update($validated);

    return redirect()->route('plans')->with('success', 'Service Plan updated!');
})->middleware(['auth'])->name('plans.update');

// Delete
Route::delete('/plans/{plan}', function (ServicePlan $plan) {
    $plan->delete();
    return redirect()->route('plans')->with('success', 'Service Plan deleted!');
})->middleware(['auth'])->name('plans.destroy');

// List jobs
Route::get('/jobs', function () {
    return Inertia::render('Jobs/Index', [
        'jobs' => ProvisioningJob::with('device:id,mac_address')->get(),
    ]);
})->middleware(['auth'])->name('jobs');

// Create form
Route::get('/jobs/create', function () {
    return Inertia::render('Jobs/Create', [
        'devices' => Device::all(['id', 'mac_address']),
    ]);
})->middleware(['auth'])->name('jobs.create');

// Store
Route::post('/jobs', function (Request $request) {
    $validated = $request->validate([
        'device_id' => 'required|exists:devices,id',
        'status' => 'required|string',
    ]);

    ProvisioningJob::create($validated);

    return redirect()->route('jobs')->with('success', 'Provisioning job created!');
})->middleware(['auth'])->name('jobs.store');

// Edit form
Route::get('/jobs/{job}/edit', function (ProvisioningJob $job) {
    return Inertia::render('Jobs/Edit', ['job' => $job]);
})->middleware(['auth'])->name('jobs.edit');

// Update
Route::put('/jobs/{job}', function (Request $request, ProvisioningJob $job) {
    $validated = $request->validate([
        'status' => 'required|string',
    ]);

    $job->update($validated);

    return redirect()->route('jobs')->with('success', 'Provisioning job updated!');
})->middleware(['auth'])->name('jobs.update');

// Delete
Route::delete('/jobs/{job}', function (ProvisioningJob $job) {
    $job->delete();
    return redirect()->route('jobs')->with('success', 'Provisioning job deleted!');
})->middleware(['auth'])->name('jobs.destroy');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
