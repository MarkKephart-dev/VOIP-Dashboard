FROM php:8.2-fpm

# Set working dir
WORKDIR /var/www

# Install system dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    libpng-dev \
    libjpeg-dev \
    libpq-dev \
    libzip-dev \
    libsqlite3-dev \
    zip unzip curl git \
    && curl -fsSL https://deb.nodesource.com/setup_18.x | bash - \
    && apt-get install -y nodejs \
    && docker-php-ext-install pdo pdo_pgsql pdo_sqlite zip

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Copy app
COPY . .

# Copy environment file
COPY .env.docker .env

# Install Node deps and build assets
RUN npm install && npm run build

# Install PHP dependencies
RUN composer install --no-interaction --prefer-dist --optimize-autoloader

# Make startup script executable
RUN chmod +x startup.sh

# Expose port
EXPOSE 8080

# Entrypoint: run the startup script
ENTRYPOINT ["./startup.sh"]
