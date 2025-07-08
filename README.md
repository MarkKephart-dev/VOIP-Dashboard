# VoIP Provisioning Dashboard

This is a full-stack Laravel + React application for managing devices, users, service plans, and provisioning jobs in a VoIP environment — with optional deployment to Google Cloud Platform and a full Docker development setup.

---

## 🚀 Getting Started with Docker

### Prerequisites

- [Docker](https://docs.docker.com/get-docker/) and [Docker Compose](https://docs.docker.com/compose/install/) installed
- Laravel application dependencies **not installed locally** (Docker handles them)

### ⚙️ Build & Run the Application

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/voip-dashboard.git
   cd voip-dashboard

2. **Create .env file:**

    ```bash
    cp .env.example.env

3. **Build and start the containers:**

    ```bash
    docker-compose up --build

4. **Run Laravel setup commands inside the container:**

    ```bash
    docker exec -it laravel-app bash
    composer install
    php artisan key:generate
    php artisan migrate --seed
    exit

5. **Visit the app in your broser:**

    http://localhost:8000

## 📚 Application Overview

This app provides an administrative dashboard for VoIP provisioning. It allows an admin to:

    ✅ View, add, edit, and delete VoIP Devices

    ✅ Manage Users

    ✅ Assign and organize Service Plans

    ✅ Track and create Provisioning Jobs

    ✅ Seed and test the app using Laravel factories

    ✅ Built using Inertia.js and React

## 📁 Key Features

*    Laravel 11 Backend with:

*         Auth, migrations, seeders, factories

*        PostgreSQL integration

*    React Frontend using Inertia

*        Tailwind CSS for styling

*        Page components for each entity

*    Dockerized for development and deployment

*    GCP-Ready: Can be containerized and pushed to Google Cloud Run or GKE

## 🧱 Pages

    /dashboard – Admin control center

    /devices – View & manage VoIP devices

    /devices/new – Add a new device

    /devices/:id/edit – Edit an existing device

    /users – View user accounts

    /plans – View service plans

    /jobs – View or create provisioning jobs

## 🐳 Docker Architecture

    * nginx: Serves the Laravel + React app

    * laravel-app: Runs PHP/Laravel and queues

    * pg: PostgreSQL database with persistent volume

## 🛠 Development Notes

    * Code is mounted into the container via volumes

    * Permissions issues? Run:

    sudo chown -R $USER:www-data storage bootstrap/cache
    chmod -R 775 storage bootstrap/cache
    
To stop and clean up Docker:

    docker-compose down

## 🔐 Security

*    .env is excluded via .gitignore

*    Do not commit secrets or keys

## 📦 Deployment

This app can be deployed on:

*    GCP Cloud Run (Docker container)

*    GCP GKE (Kubernetes)

*    Any VPS or Docker-compatible platform

👤 Author

Mark Kephart
Built with Laravel, React, PostgreSQL, and Docker
Designed to demonstrate production-level VoIP provisioning features
