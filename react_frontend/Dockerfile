# --- CONFIGURE CONTAINER ---
FROM node:16-alpine

# Set the working directory inside the container
WORKDIR /app

COPY package.json .
COPY package-lock.json .

# Copy source code
COPY . .

# --- BUILD ---
RUN npm ci

EXPOSE 3000
CMD ["npm", "run", "dev"]
