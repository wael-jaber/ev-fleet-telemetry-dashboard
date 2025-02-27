# --- Build Stage ---
    FROM node:20 as build

    WORKDIR /app

    RUN npm install -g pnpm@latest

    ENV PNPM_INSTALL_MODE=hoist
    ENV CI=true

    # Accept build-time arguments for environment variables
    ARG VITE_BACKEND_HOST
    ARG VITE_BACKEND_PORT

    # Ensure environment variables persist
    ENV VITE_BACKEND_HOST=$VITE_BACKEND_HOST
    ENV VITE_BACKEND_PORT=$VITE_BACKEND_PORT

    # Copy only essential files for better caching
    COPY package.json pnpm-lock.yaml ./

    # Install dependencies before copying full source
    RUN rm -rf node_modules && pnpm install --frozen-lockfile

    # Debugging: Print environment variables
    RUN echo "VITE_BACKEND_HOST=$VITE_BACKEND_HOST"
    RUN echo "VITE_BACKEND_PORT=$VITE_BACKEND_PORT"

    # Copy the full source code
    COPY . .

    # sanity check
    RUN rm -rf node_modules && pnpm install --frozen-lockfile
    # Run the Vite build with injected environment variables
    RUN pnpm --filter frontend build

    # --- Production Stage ---
    FROM nginx:alpine

    WORKDIR /usr/share/nginx/html

    # Copy built frontend files
    COPY --from=build /app/frontend/dist .

    # Copy the default Nginx configuration template
    COPY --from=build /app/frontend/default.conf /etc/nginx/conf.d/default.template

    # Set default environment variable for frontend port
    ENV FRONTEND_PORT=80

    # Ensure dynamic port replacement and start Nginx
    CMD envsubst '$FRONTEND_PORT' < /etc/nginx/conf.d/default.template > /etc/nginx/conf.d/default.conf && nginx -g "daemon off;"
