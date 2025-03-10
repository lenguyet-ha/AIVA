# Build stage
FROM node:18 AS builder

WORKDIR /app

# Copy package.json và package-lock.json vào container
COPY package*.json ./

# Cài đặt dependencies
RUN npm install --legacy-peer-deps

# Copy toàn bộ mã nguồn vào container
COPY . .

# Kiểm tra lỗi trong quá trình build
RUN yarn build

# Runtime stage
FROM node:18

WORKDIR /app

# Copy ứng dụng từ builder stage
COPY --from=builder /app/.next .next
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/public ./public

# Cài đặt dependencies production
RUN npm install --production

# Expose cổng 3068
EXPOSE 3068

# Command để chạy ứng dụng
CMD ["npm", "run", "start"]
