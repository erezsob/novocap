FROM mhart/alpine-node:9.4.0
MAINTAINER Valter Silva valter.silva@orderbird.com

WORKDIR /app
COPY . .

RUN yarn
