#!/bin/bash

echo "Startup script is running..."
cat .env

# Exit immediately if a command exits with a non-zero status
set -e

# Ensure SQLite file exists (only needed for SQLite)
touch database/database.sqlite

# Ensure necessary folders exist
mkdir -p storage bootstrap/cache
mkdir -p storage/framework/views
mkdir -p storage/framework/cache
mkdir -p storage/logs

# Set permissions if needed
chown -R www-data:www-data storage bootstrap/cache
chmod -R 777 storage bootstrap/cache

# Generate app key
php artisan key:generate --force

# Run migrations and seed database
php artisan migrate --seed --force

# Clear and cache configurations
php artisan config:clear
php artisan route:clear
php artisan view:clear
php artisan config:cache

# Debug: Check permissions
echo "Permissions check:"
ls -ld storage storage/framework storage/framework/views storage/framework/cache storage/logs bootstrap/cache

# Start Laravel with built-in server
echo "Starting Laravel..."
exec php -S 0.0.0.0:8080 -t public
