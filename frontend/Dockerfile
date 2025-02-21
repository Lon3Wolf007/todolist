# Use Node.js as base image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy rest of the application
COPY . .

# Build the React app
RUN npm run build

# Serve the frontend using Nginx
FROM nginx:alpine
COPY --from=0 /app/build /usr/share/nginx/html

# Expose the port
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
