FROM node:14-alpine as builder
WORKDIR /app
COPY ./ /app
RUN npm install && \
    npm run build && \
    npm run package

FROM centos:latest
USER 0
RUN yum install -y rpm-build rpmdevtools gcc rpm-sign
RUN curl -sL https://rpm.nodesource.com/setup_14.x | bash -
RUN yum install -y nodejs
#due to https://stackoverflow.com/questions/51504367/gpg-agent-forwarding-inappropriate-ioctl-for-device
RUN export GPG_TTY=$(tty)
COPY --from=builder /app/dist /app/dist
ENTRYPOINT ["node", "/app/dist/index.js"]
