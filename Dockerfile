# Use a lightweight Node.js base image
FROM node:18-alpine AS builder

# Define the build argument for DATABASE_URL
ARG DATABASE_URL

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install all dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Set the DATABASE_URL environment variable for Prisma
ENV DATABASE_URL=${DATABASE_URL}

# Run Prisma generate (creates the Prisma client)
RUN npx prisma generate

# Run Prisma migration (if there are migrations that need to be applied)
RUN npx prisma migrate deploy

# Build the application for production (SSR)
RUN npm run build

# Use a lightweight production-ready base image
FROM node:18-alpine AS runner

# Set the working directory
WORKDIR /app

# Copy the built application and necessary files from the builder
COPY --from=builder /app .

# Expose the port the app runs on (4173 for Vite)
EXPOSE 5173

# Set the DATABASE_URL environment variable for the runtime
# Start the SSR Svelte app (with vite in preview mode)
CMD ["npm","run", "preview","--", "--host", "0.0.0.0"]
