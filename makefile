
install:
	@echo "Installing dependencies for all services..."
	pnpm install

# LOCAL DEVELOPMENT

up-backend:
	@echo "Starting backend service..."
	cd backend && pnpm run dev

up-frontend:
	@echo "Starting frontend service..."
	cd frontend && pnpm run dev

# Start both frontend and backend locally in parallel
up:
	@echo "Starting frontend and backend services..."
	cd frontend && pnpm run dev &
	cd backend && pnpm run dev &
	wait

# DOCKER COMMANDS

docker-up-backend:
	@echo "Starting backend service in Docker..."
	docker-compose --env-file .env up --build backend

docker-up-frontend:
	@echo "Starting frontend service in Docker..."
	docker-compose --env-file .env up --build frontend

docker-up:
	@echo "Starting frontend and backend services in Docker..."
	docker-compose --env-file .env up --build

# TESTING COMMANDS

test-backend:
	@echo "Executing backend tests..."
	cd backend && pnpm run test

test-frontend:
	@echo "Executing frontend tests..."
	cd frontend && pnpm run test

test:
	@echo "Executing all test suites (excluding end-to-end tests)..."
	pnpm test

test-e2e:
	@echo "Executing end-to-end tests..."
	cd e2e && pnpm run test

# TESTING IN DOCKER

docker-test-backend:
	@echo "Executing backend tests in Docker..."
	docker-compose --env-file .env run --rm backend pnpm run test

docker-test-frontend:
	@echo "Executing frontend tests in Docker..."
	docker-compose --env-file .env run --rm frontend pnpm run test

docker-test:
	@echo "Executing all tests in Docker (excluding end-to-end tests)..."
	docker-compose --env-file .env run --rm backend pnpm run test
	docker-compose --env-file .env run --rm frontend pnpm run test

docker-test-e2e:
	@echo "Executing end-to-end tests in Docker..."
	docker-compose --env-file .env up --abort-on-container-exit e2e
