#Dockerfile to setup enviropment for centos rpm package 
FROM node:14-alpine as builder
WORKDIR /app
COPY ./ /app
RUN npm install && \
    npm run build && \
    npm run package

FROM centos:latest
USER 0
# library need to generate rpm pacakge
RUN yum install -y rpm-build rpmdevtools gcc rpm-sign
RUN curl -sL https://rpm.nodesource.com/setup_14.x | bash -
RUN yum install -y nodejs
#due to https://stackoverflow.com/questions/51504367/gpg-agent-forwarding-inappropriate-ioctl-for-device
RUN export GPG_TTY=$(tty)
# add package need to build rpm
COPY --from=builder /app/dist /app/dist
ENTRYPOINT ["node", "/app/dist/index.js"]
