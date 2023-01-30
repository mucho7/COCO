FROM node:18.13.0-alpine3.17 as builder

RUN npm install -g serve

RUN mkdir /app
WORKDIR /app

RUN mkdir ./build
COPY ./build ./build

ENTRYPOINT ["serve","-s","build"]