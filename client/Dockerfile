# Use official Node.js image
FROM node:18-alpine

# Set working directory inside container
WORKDIR /app

# Copy package.json and package-lock.json separately
COPY package.json package-lock.json ./

# Verify files exist (debugging step)
RUN ls -la

# Install dependencies (use --force if needed)
RUN npm install --legacy-peer-deps || npm install --force

# Copy the rest of the project files
COPY . .

# Build the Vue app
RUN npm run build

# Expose the port Vite uses
EXPOSE 5173

# Start the app
CMD ["npm", "run", "preview"]
