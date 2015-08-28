FROM ustwo/nodejs:0.12
MAINTAINER Arnau Siches <arnau@ustwo.com>

USER root
RUN apk add --update \
  nodejs-dev \
  && rm -rf /var/cache/apk/*

COPY package.json /home/ustwo/package.json
RUN npm install --production
COPY src /home/ustwo/src
RUN mkdir -p /home/ustwo/public

CMD ["node", "./node_modules/babel/lib/_babel-node", "--optional", "es7.classProperties", "src/server"]
