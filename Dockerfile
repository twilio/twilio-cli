FROM node:18.16.0
RUN apt-get update && apt-get install -y libsecret-1-dev

RUN mkdir /twilio
WORKDIR /twilio

COPY . .
RUN npm install
RUN npm link
