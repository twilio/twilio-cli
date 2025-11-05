FROM node:22.14.0
RUN apt-get update && apt-get install -y libsecret-1-dev

RUN mkdir /twilio
WORKDIR /twilio

COPY . .
COPY ../twilio-cli-core ./twilio-cli-core
RUN npm install
RUN npm link
#CMD ["bash"]
