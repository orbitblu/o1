#!/bin/bash

echo "Organizing OrbitBlu project structure..."

# Create project structure
mkdir -p {src/{config,controllers,middleware,models,routes,services,utils},tests,docs}

# Create documentation
cat > docs/API.md << 'EOL'
# OrbitBlu API Documentation

## Authentication
POST /api/auth/register
POST /api/auth/login

## Users
GET /api/users
POST /api/users
GET /api/users/:id
PUT /api/users/:id
DELETE /api/users/:id

## Health
GET /api/health
GET /api/health/db
EOL

# Update package.json scripts
cat > package.json << 'EOL'
{
  "name": "orbitblu-api",
  "version": "1.0.0",
  "description": "OrbitBlu API Server",
  "main": "src/server.js",
  "scripts": {
    "start": "node src/server.js",
    "dev": "nodemon src/server.js",
    "test": "jest",
    "lint": "eslint src/**/*.js"
  },
  "dependencies": {
    "bcryptjs": "^2.4.3",
    "cors": "^2.8.5",
    "dotenv": "^16.3.1",
    "express": "^4.18.2",
    "express-validator": "^7.0.1",
    "jsonwebtoken": "^9.0.2",
    "mongodb": "^6.3.0",
    "winston": "^3.11.0"
  },
  "devDependencies": {
    "jest": "^29.7.0",
    "nodemon": "^3.0.1",
    "eslint": "^8.53.0"
  }
}
EOL

# Create .gitignore
cat > .gitignore << 'EOL'
# Dependencies
node_modules
package-lock.json

# Environment
.env
.env.*
!.env.example

# Logs
logs
*.log

# IDE
.vscode
.idea

# System
.DS_Store
Thumbs.db
EOL

# Set permissions
chmod -R 755 .
find . -type f -exec chmod 644 {} \;
find . -type d -exec chmod 755 {} \;

echo "Project structure organized! Next steps:"
echo "1. npm install"
echo "2. git add ."
echo "3. git commit -m 'chore: organize project structure'"
echo "4. git push origin main"
