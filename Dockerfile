# Use the official Node.js image as a base
FROM node:20-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock) first to install dependencies
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of your application files (including next.config.js)
COPY . .

# Build the Next.js app
RUN npm run build

# Expose the port on which the app will run
EXPOSE 3000

# Start the Next.js app
CMD ["npm", "start"]
