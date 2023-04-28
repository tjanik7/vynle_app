# --- CONFIGURE CONTAINER ---
FROM node:16-alpine

# Set the working directory inside the container
WORKDIR /app

COPY ../../package.json .
COPY ../../package-lock.json .

# --- BUILD ---
RUN npm ci
RUN npm run dev

EXPOSE 3000

# Start the app
# CMD ["npx", "serve", "build"]
