ARG PHP_VERSION
FROM php:${PHP_VERSION}

## Diretório da aplicação
ARG APP_DIR=/var/www/app

## Versão da Lib do Redis para PHP
ARG REDIS_LIB_VERSION=5.3.7

### apt-utils é uma extensão de recursos do gerenciador de pacotes APT
RUN apt-get update -y && apt-get install -y --no-install-recommends \
    apt-utils \
    supervisor \
    nginx \
    zlib1g-dev \
    libzip-dev \
    unzip \
    libpng-dev \
    libpq-dev \
    libxml2-dev \
    && apt-get clean

# Instalar dependências do PHP e do Redis
RUN docker-php-ext-install mysqli pdo pdo_mysql pdo_pgsql pgsql session xml \
    && pecl install redis-${REDIS_LIB_VERSION} \
    && docker-php-ext-enable redis \
    && docker-php-ext-install zip iconv simplexml pcntl gd fileinfo

# Instalar Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Copiar configurações do supervisord e Nginx
COPY ./docker/supervisord/supervisord.conf /etc/supervisor/conf.d/supervisord.conf
COPY ./docker/supervisord/conf /etc/supervisord.d/
COPY ./docker/php/extra-php.ini "$PHP_INI_DIR/99_extra.ini"
COPY ./docker/php/extra-php-fpm.conf /etc/php8/php-fpm.d/www.conf

# Configurações do Nginx
COPY ./docker/nginx/sites.conf /etc/nginx/sites-enabled/default.conf
COPY ./docker/nginx/error.html /var/www/html/error.html

## Diretório da aplicação
WORKDIR $APP_DIR
RUN chown www-data:www-data $APP_DIR

# Copiar a aplicação para dentro do container
COPY --chown=www-data:www-data ./app .

# Instalar dependências do Laravel
RUN rm -rf vendor
RUN composer install --no-interaction

# Configurar banco de dados SQLite
RUN touch database/database.sqlite && chmod a+rw database/database.sqlite

# Gerar chave do Laravel e rodar migrações
RUN php artisan key:generate
RUN php artisan migrate

# Limpeza
RUN apt-get clean && rm -rf /var/lib/apt/lists/*

# Rodar o supervisord
CMD ["/usr/bin/supervisord", "-c", "/etc/supervisor/supervisord.conf"]
