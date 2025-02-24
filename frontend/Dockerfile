FROM node:20 as build

WORKDIR /app

RUN npm install -g pnpm@latest

ENV PNPM_INSTALL_MODE=hoist
ENV CI=true

COPY package.json pnpm-lock.yaml ./
COPY . .

RUN rm -rf node_modules && pnpm install --frozen-lockfile
RUN pnpm --filter frontend build


# Production Image

FROM nginx:alpine

WORKDIR /usr/share/nginx/html

# Copy built frontend files from build stage
COPY --from=build /app/frontend/dist .
COPY --from=build /app/frontend/default.conf /etc/nginx/conf.d/default.template


# Set default environment variable for frontend port
ENV FRONTEND_PORT=80



# Ensure dynamic port replacement and start Nginx
CMD envsubst '$FRONTEND_PORT' < /etc/nginx/conf.d/default.template > /etc/nginx/conf.d/default.conf && nginx -g "daemon off;"
