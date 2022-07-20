## Stack:
* Language:        NodeJS
* Server:              ExpressJS
* DB:                    MongoDB
* Authorization:  JsonWebToken
## Task:
Необходимо сделать сервис с REST API. Авторизация по токену. MongoDB (база данных). Создание Токена при каждом входе (действителен 15 минут). Продлевать при любом запросе пользователя.
Также API для вывода списка пользователей, добавления, редактирования, удаления пользователя.
## Docker
```bash
make prepare
docker compose up

```
## Local
### Setup:
```bash
make setup

```
### Start:
```bash
make start

```
