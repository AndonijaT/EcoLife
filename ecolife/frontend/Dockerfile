# Use the official Node.js image as the base image
FROM node:14

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Build the application
RUN npm run build

# Use the official Nginx image to serve the frontend
FROM nginx:alpine

# Copy the build output to the Nginx HTML directory
COPY --from=0 /usr/src/app/build /usr/share/nginx/html

# Expose the port Nginx runs on
EXPOSE 5000

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
