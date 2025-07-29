FROM php:8.3-fpm

# Install system dependencies
RUN apt-get update && apt-get install -y \
    build-essential libpng-dev libjpeg-dev libpq-dev zip unzip curl git libzip-dev \
    sqlite3 \
    libsqlite3-dev \
    && docker-php-ext-install pdo pdo_pgsql pdo_sqlite zip

# ...other setup (composer, node, etc.)

# Set working directory
WORKDIR /app

# Copy project files
COPY . .

# Install Composer deps
RUN curl -sS https://getcomposer.org/installer | php && \
    php composer.phar install --no-interaction --prefer-dist --optimize-autoloader

# Generate app key
RUN php artisan key:generate

# Create SQLite database and seed it
RUN touch database/database.sqlite \
 && php artisan migrate --force \
 && php artisan db:seed --force

