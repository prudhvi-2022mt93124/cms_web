# Use an official Node.js runtime as a parent image
FROM node:16

# Set the working directory
WORKDIR /app

# Install app dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application
COPY . .

# Build the app (if necessary, for React or Angular apps)
RUN npm run build

# Expose the port
EXPOSE 80

# Run the app
CMD ["npm", "start"]
