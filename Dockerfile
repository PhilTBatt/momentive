# Use an existing image as base
FROM node:18

# Set working directory
WORKDIR /app

# Copy files
COPY package*.json ./
RUN npm install
COPY . .

# Create a non-root user
RUN useradd -m appuser
RUN chown -R appuser:appuser /app
USER appuser

# Expose a port
EXPOSE 3000

# Start the app
CMD ["npm", "run", "dev"]