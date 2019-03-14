FROM node:8-jessie
RUN apt-get update && apt-get install -y libsecret-1-dev

RUN mkdir /cli
WORKDIR /cli
COPY . .
RUN npm install -D ../cli-test
RUN npm install ../cli-core
RUN npm install
CMD ["npm", "test"]
