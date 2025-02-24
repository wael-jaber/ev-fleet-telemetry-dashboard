FROM mcr.microsoft.com/playwright:v1.50.1

WORKDIR /app

RUN npm install -g pnpm@latest

# to avoid interactive prompts
ENV PNPM_INSTALL_MODE=hoist
ENV CI=true

# first for caching
COPY package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile --filter e2e

# Copy the entire monorepo
COPY . .

# Set correct command to run `make test-e2e`
CMD ["sh", "-c", "cd e2e && pnpm test"]
