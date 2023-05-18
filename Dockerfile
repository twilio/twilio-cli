FROM node:14.21.3
RUN apt-get update && apt-get install -y libsecret-1-dev

RUN mkdir /twilio
WORKDIR /twilio

COPY . .
RUN npm link
