# Docker 

Passo a passo da Criação do Docker com Laravel 11 + PHP 8.4 + Nginx + Redis + Supervisor + MYSQL + Mailpit + Adminer

# Passo a Passo para a instalção do Container Docker

- Aqui partimos do princípio que você já esteja com o Docker configurado em sua máquina, o qual será necessário para rodar os comandos abaixo.

## Verifique se seu docker esta rodando.

```sh
sudo docker compose version
```

## Agora confirme se algum container esta rodando
- Caso tenha algum container já rodando em sua máquina, pode ser interessante derrubá-lo, para não haver conflito nas portas 80 e 443, que iremos utilizar aqui

```sh
sudo docker ps
```

## Caso tenha container rodando derrube-os

```sh
sudo docker stop $(sudo docker ps -a -q)
```

## Caso seja necessário remover seus containers recentemente executados

```sh
sudo docker rm $(sudo docker ps -a -q)
```

## Caso seja preciso re iniciar seu Docker

```sh
sudo service docker restart
```

## Clone o Laravel
- Certifique-se de clonar o Larvel para uma pasta 'app'. Se ficar na dúvida veja o vídeo deste projeto.

- A listagem de pastas do projeto deve ficar:

```
    app/
    docker/
    .gitignore
    docker-compose.yml
    readme.md
```

## Build image Docker:

```sh
sudo docker compose build
```

## Para não utilizar o cache do seu docker
- Pode acontecer de o seu docker utilizar imagens já existentes em seu cache. Se isso ocasionar em erro, utilize o comando abaixo:

```sh
sudo docker compose build --no-cache
```

## Subindo a aplicação:

```sh
sudo docker compose up
```

- Para rodar o ambiente sem precisar manter o terminar aberto, execute:

```sh
sudo docker compose up -d
```

## Derrubar a aplicação:

```sh
sudo docker compose down
```

## Acessar comandos dentro do Container:

```sh
sudo docker ps
sudo docker exec -it id_do_container web bash
```

# Solução de Erros

## Erros de permissão

- não execute nada estando como o usuário root, pois vai dar erros.

- Para dar permissão ao seu usuário, temos os seguintes comandos

```sh
cd /var/www && \
chown -R www-data:www-data * && \
chmod -R o+w app
```

ou

### Passo a passo
Clone Repositório
```sh
git clone -b main https://github.com/wesleyfernandocabrera/app-portal.git app-portal
```
```sh
cd app-portal
```

Suba os containers do projeto
```sh
docker-compose up -d
```


Crie o Arquivo .env
```sh
cp .env.example .env
```

cd app

Acesse o container app
```sh
docker-compose exec web bash
```
Instale as dependências do projeto
```sh
composer install
```

Gere a key do projeto Laravel
```sh
php artisan key:generate
```

OPCIONAL: Gere o banco SQLite (caso não use o banco MySQL)
```sh
touch database/database.sqlite
```

Rodar as migrations
```sh
php artisan migrate
```

Acesse o projeto
[http://localhost](http://localhost)
