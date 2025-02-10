# --- FRONTEND REACT CONTAINER ---
FROM node:16-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy source code
COPY . .

# --- BUILD ---
RUN npm ci

EXPOSE 8080
