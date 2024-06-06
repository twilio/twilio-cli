#Dockerfile to setup environment for centos rpm package 
FROM node:14-alpine as builder
WORKDIR /app
COPY ./ /app
RUN npm install && \
    npm run build && \
    npm run package

FROM quay.io/centos/centos:stream9
# library need to generate rpm package
RUN yum install -y rpm-build rpmdevtools gcc rpm-sign pinentry && \
    curl -sL https://rpm.nodesource.com/setup_14.x | bash - && \
    yum install -y nodejs
# add package need to build rpm
COPY --from=builder /app/dist /app/dist
ENTRYPOINT ["node", "/app/dist/index.js"]
