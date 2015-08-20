FROM ustwo/nodejs
MAINTAINER Arnau Siches <arnau@ustwo.com>

USER root
RUN apk add --update \
  nodejs-dev \
  && rm -rf /var/cache/apk/*

COPY package.json /home/ustwo/package.json
RUN npm install --production
RUN mkdir -p /home/ustwo/public
COPY src /home/ustwo/src

CMD ["node", "/usr/local/src/node_modules/babel/lib/_babel-node", "--optional", "es7.classProperties", "src/server"]
