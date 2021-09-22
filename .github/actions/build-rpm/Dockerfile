FROM node:12-alpine as builder
WORKDIR /app
COPY ./ /app
RUN npm install && \
    npm run build && \
    npm run package

FROM centos/nodejs-12-centos7
USER 0
RUN yum install -y rpm-build rpmdevtools gcc make coreutils
COPY --from=builder /app/dist /app/dist
ENTRYPOINT ["node", "/app/dist/index.js"]