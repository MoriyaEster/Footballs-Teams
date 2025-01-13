# Use an official Node.js runtime as the base image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json into the container
COPY package*.json ./

# Install dependencies with legacy peer deps to resolve conflicts
RUN npm install --legacy-peer-deps

# Copy the entire project directory into the container
COPY . .

# Build the app for production
RUN npm run build

# Expose the port React will run on
EXPOSE 3000

# Start the app using a static file server
RUN npm install -g serve
CMD ["serve", "-s", "build", "-l", "3000"]
