FROM node:16-alpine AS builder

WORKDIR /app

ARG CURRENCY_EXCHANGE_API_KEY=""
ENV CURRENCY_EXCHANGE_API_KEY=${CURRENCY_EXCHANGE_API_KEY}

COPY package.json ./
COPY package-lock.json ./

RUN npm install

COPY . ./

RUN npm run build 

EXPOSE 8080

CMD ["npm","run", "start"]
