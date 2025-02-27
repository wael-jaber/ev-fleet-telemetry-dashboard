# EV Fleet Telemetry Dashboard

![example branch parameter](https://github.com/wael-jaber/ev-fleet-telemetry-dashboard/actions/workflows/ci.yaml/badge.svg?branch=develop)
![Codecov](https://codecov.io/gh/wael-jaber/ev-fleet-telemetry-dashboard/branch/develop/graph/badge.svg)
[![Storybook](https://cdn.jsdelivr.net/gh/storybookjs/brand@master/badge/badge-storybook.svg)](https://wael-jaber.github.io/ev-fleet-telemetry-dashboard/storybook)

A sophisticated real-time monitoring solution for electric vehicle fleets.

## Application Preview

![Dashboard Demo](docs/screenshots/dashboard-demo.gif)

_Real-time dashboard showing vehicle telemetry data and interactive features_

## Features

- **Real-time Vehicle Monitoring**: Track up to 10 vehicles with 12 telemetry data points per vehicle
- **Interactive Dashboard**: Customizable layout with drag-and-drop panels
- **Interactive Map**: Real-time vehicle locations displayed on an interactive map
- **Detailed Analytics**: Overview panel showing fleet-wide statistics and individual vehicle details
- **Basic Notifications**: System to display critical events
- **Dark Mode**: Toggle between light and dark themes
- **Internationalization**: Support for multiple languages (EN and DE)

## Architecture

```
/ev-fleet-telemetry-dashboard
│── backend/            # Express WebSocket server for simulating telemetry data
│── frontend/           # React dashboard application
│── e2e/                # Playwright end-to-end tests
│── shared/types        # Shared TypeScript interfaces and types
│── Makefile            # Development commands for easy workflow
│── docker-compose.yml  # Docker configuration for containerized deployment
```

### Tech Stack

#### Frontend

- **Framework**: React 19 with TypeScript
- **UI**: Material UI v6
- **State Management**: Redux Toolkit
- **Data Visualization**: Recharts
- **Mapping**: Leaflet/React-Leaflet
- **Layout**: React Grid Layout for customizable dashboard
- **Real-time Communication**: WebSockets
- **Testing**: Vitest, React Testing Library
- **Component Development**: Storybook

#### Backend

- **Runtime**: Node.js with TypeScript
- **Server**: Express
- **Real-time Communication**: WebSockets (ws)
- **Testing**: Vitest, Supertest

#### Quality & Tooling

- **E2E Testing**: Playwright
- **Containerization**: Docker
- **Git Workflow**: Husky, Commitlint, Commitizen
- **Code Quality**: ESLint, Prettier

## Getting Started

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (Latest LTS version)
- [pnpm](https://pnpm.io/installation) (Package Manager)
- [Docker](https://docs.docker.com/get-docker/) and [Docker Compose](https://docs.docker.com/compose/install/) (for containerized deployment)
- [GNU Make](https://www.gnu.org/software/make/) (for using the Makefile commands)

You'll also need to create a `.env` file based on the provided `.env.example`.

### Installation

1. Clone the repository

   ```sh
   git clone https://github.com/yourusername/ev-fleet-telemetry-dashboard.git
   cd ev-fleet-telemetry-dashboard
   ```

2. Copy the environment example file and configure as needed

   ```sh
   cp .env.example .env
   ```

3. Install dependencies
   ```sh
   make install
   # or directly: pnpm install
   ```

## Running the Project

### Local Development

Start the complete stack (frontend + backend):

```sh
make up
```

Or start services individually:

```sh
# Backend only
make up-backend

# Frontend only
make up-frontend
```

### Docker Deployment

Build and run the complete stack in Docker:

```sh
make docker-up
```

Or build and run services individually:

```sh
# Backend only
make docker-up-backend

# Frontend only
make docker-up-frontend
```

Note: These commands build production-ready containers and are not intended for development purposes.

## Testing

Run all tests (except E2E):

```sh
make test
# or: pnpm test
```

Run specific test suites:

```sh
# Backend tests
make test-backend

# Frontend tests
make test-frontend

# End-to-end tests (ensure frontend and backend services are running first)
make test-e2e
```

## Development Workflow

### Code Quality

Format and lint the codebase:

```sh
pnpm run format
pnpm run lint
```

### Commit Guidelines

This project follows [Conventional Commits](https://www.conventionalcommits.org/) using Commitizen and enforces them through Husky git hooks:

```sh
# Use Commitizen for guided commit creation
pnpm run commit
```

#### Git Hooks

The project includes the following Husky hooks:

- **pre-commit**: Runs formatting, linting, and tests before allowing commits

  ```sh
  #!/usr/bin/env sh
  . "$(dirname -- "$0")/_/husky.sh"

  npm run precommit && git add .
  ```

- **commit-msg**: Validates commit messages against conventional commit format

  ```sh
  #!/bin/sh
  . "$(dirname "$0")/_/husky.sh"

  # Run commitlint to ensure commit messages follow the convention
  pnpm exec commitlint --edit $1
  ```

These hooks ensure code quality and consistent commit messages throughout the project.

### Pre-commit Checks

Run format, lint, and tests before committing:

```sh
pnpm run precommit
```

## Configuration

The application can be configured through environment variables. Copy `.env.example` to `.env` and adjust as needed:

```
# Frontend Configuration
FRONTEND_PORT=3001

# Backend Configuration
VITE_BACKEND_HOST=localhost
VITE_BACKEND_PORT=443

# Health Check Configuration
BACKEND_HEALTHCHECK_URL=http://localhost:${VITE_BACKEND_PORT}/health-check
FRONTEND_HEALTHCHECK_URL=http://localhost:${FRONTEND_PORT}
```

## CI/CD Pipeline

This project uses GitHub Actions for continuous integration and deployment:

### Continuous Integration

The CI workflow automatically runs on every push and pull request:

- Lints and tests frontend code
- Lints and tests backend code
- Generates and uploads code coverage reports

### Staging Deployment

The staging deployment workflow runs on pushes to the develop branch:

- Builds and pushes Docker images to GitHub Container Registry
- Deploys the application to Render
- Runs end-to-end tests against the staging environment
- Deploys Storybook to GitHub Pages

These workflows ensure code quality and provide automated testing and deployment.

> **Note**: The current CI/CD implementation was designed with time constraints in mind and may not follow all best practices. Future improvements could include better workflow separation, more granular job definitions, and improved caching strategies.

## Deployment

The application is deployed on Render's free tier:

- **Backend**: [https://backend-staging-1zqj.onrender.com](https://backend-staging-1zqj.onrender.com)
- **Frontend**: [https://frontend-staging-0ys2.onrender.com](https://frontend-staging-0ys2.onrender.com)
- **Storybook**: [https://wael-jaber.github.io/ev-fleet-telemetry-dashboard/storybook](https://wael-jaber.github.io/ev-fleet-telemetry-dashboard/storybook/?path=/story/components-batterylist--light-mode)

**Note**: These services are hosted on Render's free tier, which means they automatically spin down after 15 minutes of inactivity. The first request after inactivity may take up to 50+ seconds to respond while the service restarts.

## Project Status & Future Development

This project implements the majority of the planned features:

- [x] Real-time data simulation
- [x] Dashboard with overview and individual vehicle panels
- [x] Interactive map
- [x] Customizable dashboard layout
- [x] Dark mode
- [x] Basic notifications
- [x] Internationalization (i18n)

### Planned Improvements

- [ ] Add vehicle filtering and sorting
- [ ] Implement full notification center
- [ ] Add offline support and alert system
- [ ] Expand test coverage and documentation
- [ ] Add WebSocket API documentation
