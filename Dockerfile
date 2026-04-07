# Multi-stage Dockerfile for building and serving a React app

# Build stage
FROM node:18-bullseye-slim AS build
WORKDIR /app

# Install dependencies (use npm ci for reproducible installs)
# Copy package files first to leverage Docker layer cache
COPY frontend/package*.json ./
RUN npm install --silent

# Copy source and build
COPY frontend/ .
RUN npm run build

# Production stage
FROM nginx:stable-alpine
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
