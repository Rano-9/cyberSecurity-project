FROM node:26-alpine3.24 AS builder

WORKDIR /usr/src/frontend/
COPY package.json package-lock.json* ./

RUN --mount=type=cache,target=/root/.npm npm ci

COPY . .
EXPOSE 5173

RUN npm run build