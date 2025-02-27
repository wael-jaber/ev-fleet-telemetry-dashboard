# --- Build Stage ---
    FROM node:20 as build

    WORKDIR /app

    # Install PNPM globally
    RUN npm install -g pnpm@latest

    # Avoid interactive prompts & enforce workspace hoisting
    ENV PNPM_INSTALL_MODE=hoist
    ENV CI=true

    # Accept build-time arguments
    ARG VITE_BACKEND_PORT
    ARG NODE_ENV=production

    # Set environment variables for the build stage
    ENV VITE_BACKEND_PORT=$VITE_BACKEND_PORT
    ENV NODE_ENV=$NODE_ENV

    # Copy only package-related files for better caching
    COPY package.json pnpm-lock.yaml ./

    # Install dependencies **only for the backend** (avoiding workspace issues)
    RUN pnpm install --frozen-lockfile --ignore-scripts --filter backend...

    # Remove potentially wrong esbuild binary before reinstalling it for the correct platform
    RUN rm -rf node_modules/.pnpm/esbuild* node_modules/esbuild \
        && npm rebuild esbuild \
        && pnpm rebuild esbuild

    # Copy application code
    COPY ./backend ./backend
    COPY ./shared ./shared

    WORKDIR /app/backend

    # Ensure esbuild is reinstalled in the backend workspace (to avoid monorepo conflicts)
    RUN rm -rf node_modules/.pnpm/esbuild* node_modules/esbuild \
        && npm install esbuild --force \
        && pnpm rebuild esbuild

    # install backend deps
    RUN pnpm install

    # Run the backend build
    RUN pnpm run build

    # --- Production Stage ---
    FROM node:20 as runtime

    WORKDIR /app

    # Copy only the built backend files
    COPY --from=build /app/backend/dist /app/dist
    COPY --from=build /app/backend/package.json /app/package.json
    COPY --from=build /app/backend/node_modules /app/node_modules

    # Set environment variables for runtime
    ENV VITE_BACKEND_PORT=${VITE_BACKEND_PORT:-5001}
    ENV NODE_ENV=production

    EXPOSE ${VITE_BACKEND_PORT}

    # Start the backend
    CMD ["node", "/app/dist/bundle.js"]
