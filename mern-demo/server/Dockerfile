FROM node:18-alpine
WORKDIR /app

# Copy package.json ra thư mục gốc /app để cài đặt dependency chung
COPY server/package*.json ./
RUN npm install

# Copy toàn bộ thư mục mern-demo (models, server,...) vào /app
COPY . .

# Chuyển vào thư mục server để chạy ứng dụng
WORKDIR /app/server
EXPOSE 5000
CMD ["node", "server.js"]