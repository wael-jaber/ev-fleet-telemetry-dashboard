# EV Fleet Telemetry Dashboard

The EV Fleet Telemetry Dashboard is a web application designed to monitor real-time telemetry data from electric vehicles. It consists of:

- Frontend: A dashboard built with React/Vue/Angular/Svelte.
- Backend: An Express-based WebSocket server that simulates real-time vehicle telemetry data.
- Testing & CI/CD: Automated unit and integration tests, with support for end-to-end testing.

## Project Structure

```
/ev-fleet-telemetry-dashboard
│── backend/            # Express WebSocket server
│── frontend/           # Frontend web application
│── e2e/               # End-to-end test suite
│── Makefile           # Development commands
│── package.json       # Dev dependencies & scripts
│── docker-compose.yml # Docker configurations
│── .husky/            # Pre-commit hooks setup
│── .env.example       # Example environment variables
```

## Installation & Setup

### Prerequisites

Ensure you have the following installed:

- GNU Make (for `make` commands)
- Docker (For containerized development)
- Node.js (Latest LTS)
- pnpm (Package Manager)
- A `.env` file based on `.env.example`

### Install Dependencies

```sh
make install
```

## Running the Project

### Local Development

Start Backend:

```sh
make up-backend
```

Start Frontend:

```sh
make up-frontend
```

Start Full Stack (Frontend + Backend):

```sh
make up
```

### Running in Docker

The Docker setup consists of **multi-stage builds** for both the frontend and backend. In the final image, we do not have access to `package.json` commands. Ensure that a `.env` file exists before running.

Start Backend (Docker):

```sh
make docker-up-backend
```

Start Frontend (Docker):

```sh
make docker-up-frontend
```

Start Full Stack in Docker:

```sh
make docker-up
```

## Testing Workflow

### Run Tests Locally

Backend Tests:

```sh
make test-backend
```

Frontend Tests:

```sh
make test-frontend
```

Run All Tests:

```sh
make test
```

Run End-to-End (E2E) Tests:

```sh
make test-e2e
```

### Run Tests in Docker (Without Docker Compose)

Backend Tests:

```sh
make docker-test-backend
```

Frontend Tests:

```sh
make docker-test-frontend
```

Run All Tests in Docker:

```sh
make docker-test
```

Run End-to-End (E2E) Tests in Docker:

```sh
make docker-test-e2e
```

## Code Formatting & Linting

Run Format & Lint Checks:

```sh
pnpm run format
pnpm run lint
```

Auto-Fix Issues:

```sh
pnpm run lint --fix
```

Run Tests Before Committing:

```sh
pnpm run precommit
```

## Commit Guidelines

This project follows Conventional Commits using Commitizen.

To Make a Proper Commit:

```sh
pnpm run commit
```

This will guide you through structuring your commit message properly.

## Development Workflow

1. Clone the repository & install dependencies
   ```sh
   git clone https://github.com/wael-jaber/ev-fleet-telemetry-dashboard.git
   cd ev-fleet-telemetry-dashboard
   make install
   ```
2. Start the development environment
   ```sh
   make up
   ```
3. Run tests before committing changes
   ```sh
   make test
   pnpm run precommit
   ```
4. Push code & create PRs following commit guidelines
   ```sh
   git push origin feature-branch
   ```

## Next Steps

- Add WebSocket API documentation (`API.md`)
- Write test strategy (`TESTING.md`)
- Setup GitHub Actions for automated CI/CD (Optional)

To start the project, run:

```sh
make up
```
