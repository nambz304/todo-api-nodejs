# Stage 1: Build (compile TypeScript)
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package.json và install dependencies
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Build TypeScript sang JavaScript
RUN npm run build

# Stage 2: Production image (nhẹ hơn)
FROM node:20-alpine

WORKDIR /app

# Copy node_modules và dist từ builder
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist

# Install chỉ production dependencies
RUN npm install --production

# Copy .env (nếu cần, nhưng tốt hơn dùng docker-compose env_file)
COPY .env ./

# Chạy app từ dist
CMD ["node", "dist/server.js"]