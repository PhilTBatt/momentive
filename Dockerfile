# Use an existing image as base
FROM node:18

# Set working directory
WORKDIR /app

# Copy files
COPY package*.json /.
RUN npm install
COPY . .

# Expose a port
EXPOSE 3000

# Start the app
CMD ["npm", "run", "dev"]