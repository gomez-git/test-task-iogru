setup: install prepare

install:
	npm ci

prepare:
	-cp -n .env.example .env

start:
	npm start -s

start-dev:
	npm run dev -s

docker-up:
	docker compose up

lint:
	npx eslint .
