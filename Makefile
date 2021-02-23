build:
	docker-compose build

start:
	docker-compose up --build

clean:
	docker-compose stop
	docker-compose down
	docker volume prune

migrations:
	docker-compose exec api python manage.py makemigrations

migrate:
	docker-compose exec api python manage.py migrate

tests:
	docker-compose exec api python manage.py test --verbosity=2

lint:
	docker-compose exec api poetry run black ./api