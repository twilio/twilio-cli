FROM node:lts
RUN apt-get update && apt-get install -y libsecret-1-dev

RUN mkdir /twilio
WORKDIR /twilio

COPY . .
RUN npm link
