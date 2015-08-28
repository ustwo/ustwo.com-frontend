FROM iojs:1.6

MAINTAINER Nick Collings <nick@ustwo.com>

ENV TERM=xterm-256color \
    NODE_ENV=production

WORKDIR /usr/local/src

COPY compiler.json /usr/local/src/package.json
RUN npm install
RUN mkdir -p /usr/local/src/public

COPY gulpfile.js /usr/local/src/gulpfile.js
COPY src /usr/local/src/src

CMD ["npm", "run", "compile"]
