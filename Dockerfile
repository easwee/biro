FROM node:12-alpine AS builder

WORKDIR /app

COPY package.json ./

RUN npm install

COPY . ./

RUN npm run build

FROM nginx:alpine

COPY --from=builder /app/public /usr/share/nginx/html/
