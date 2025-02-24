FROM node:20 as build

WORKDIR /app

RUN npm install -g pnpm@latest

# avoid interactive prompts
ENV PNPM_INSTALL_MODE=hoist
ENV CI=true

# for caching
COPY package.json pnpm-lock.yaml ./

# Install dependencies **only for the backend** (avoiding workspace issues)
RUN pnpm install --frozen-lockfile --ignore-scripts --filter backend...

# Remove potentially wrong esbuild binary before reinstalling it for the correct platform
RUN rm -rf node_modules/.pnpm/esbuild* node_modules/esbuild \
    && npm rebuild esbuild \
    && pnpm rebuild esbuild


COPY . .

WORKDIR /app/backend

# Ensure esbuild is reinstalled in the backend workspace (to avoid monorepo conflicts)
RUN rm -rf node_modules/.pnpm/esbuild* node_modules/esbuild \
    && npm install esbuild --force \
    && pnpm rebuild esbuild

# Run the backend build
RUN pnpm run build


# Production image

FROM node:20 as runtime

WORKDIR /app

# Copy only the bundled backend files
COPY --from=build /app/backend/dist/bundle.js /app/bundle.js

ENV PORT=5001
EXPOSE ${PORT}

# Start the backend
CMD ["node", "/app/bundle.js"]
