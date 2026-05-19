# Multi-stage Dockerfile for building and serving a React app

# Build stage
FROM node:18-alpine AS build
WORKDIR /app

# Install dependencies (use npm ci for reproducible installs)
# Copy package files first to leverage Docker layer cache
COPY frontend/package*.json ./
RUN npm ci --silent

# Copy source and build
COPY frontend/ .
RUN npm run build

# Production stage
FROM nginx:stable-alpine
RUN apk update && apk upgrade && apk add --no-cache zlib libpng
COPY --from=build /app/dist /usr/share/nginx/html
COPY frontend/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 4776
CMD ["nginx", "-g", "daemon off;"]
