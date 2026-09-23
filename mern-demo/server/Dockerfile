FROM node:18-alpine

WORKDIR /app

COPY server/package*.json ./

RUN npm install

COPY server ./server
COPY models ./models

WORKDIR /app/server

EXPOSE 5000

CMD ["node", "server.js"]