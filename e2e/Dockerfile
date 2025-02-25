FROM mcr.microsoft.com/playwright:v1.50.1

WORKDIR /app

RUN npm install -g pnpm@latest

# to avoid interactive prompts
ENV PNPM_INSTALL_MODE=hoist
ENV CI=true

# first for caching
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

# Copy the entire monorepo
COPY ./e2e ./e2e

RUN ls

RUN ls


RUN pnpm install --frozen-lockfile --filter e2e

# Ensure Playwright dependencies are installed

WORKDIR /app/e2e

RUN npx playwright install --with-deps

# Set correct command to run `make test-e2e`
CMD ["sh", "-c", "pnpm test"]
