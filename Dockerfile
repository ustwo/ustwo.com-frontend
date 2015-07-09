FROM iojs:1.6

MAINTAINER Nick Collings <nick@ustwo.com>

RUN mkdir -p /usr/local/src/logs
RUN mkdir -p /usr/local/src/public

WORKDIR /usr/local/src

ENV TERM=xterm-256color
ENV NODE_ENV=production

COPY assets /usr/local/src/assets
COPY data /usr/local/src/data
COPY server /usr/local/src/server
COPY source /usr/local/src/source
COPY templates /usr/local/src/templates

COPY package.json /usr/local/src/package.json
COPY bower.json /usr/local/src/bower.json
COPY gulpfile.js /usr/local/src/gulpfile.js

RUN npm install && npm run bower && npm run compile

VOLUME /usr/local/src/logs

EXPOSE 8888

CMD ["npm", "start"]
