# Use an official Node.js runtime as a parent image
FROM node:18-alpine as build

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json first for efficient caching
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Build the React app for production
RUN npm run build

# Use a lightweight web server (nginx) to serve the production build
FROM nginx:alpine

# Copy the build files from Parcel's output directory to nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80 to allow access to the app
EXPOSE 3000

# Start nginx server
CMD ["nginx", "-g", "daemon off;"]
