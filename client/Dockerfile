# Use official Node.js image
FROM node:18-alpine

# Set working directory inside container
WORKDIR /app

# Copy package.json and package-lock.json first
COPY package.json package-lock.json ./

# Clean up old node_modules and package-lock.json before installing dependencies
RUN rm -rf node_modules package-lock.json

# Install dependencies (retry with --legacy-peer-deps if necessary)
RUN npm install --legacy-peer-deps || npm install --force


# Check if Vite is installed successfully
RUN npm list vite
RUN ls -la node_modules/.bin # Verify if vite is inside node_modules/.bin

# Copy the rest of the application files
COPY . .

# Build the Vue app
RUN npm run build

# Expose the port Vite uses
EXPOSE 5173

# Start the app
CMD ["npm", "run", "preview"]
