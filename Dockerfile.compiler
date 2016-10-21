FROM node:6.9.1-slim
MAINTAINER Arnau Siches <arnau@ustwo.com>

ENV TERM xterm-256color
ENV NODE_ENV production
ENV NODE_PATH /home/ustwo/src
ENV SHELL /bin/bash

RUN apt-get update -yqq \
 && apt-get install -yqq \
          curl \
          grep \
          rsync \
          parallel

RUN mkdir /root/.parallel \
 && touch /root/.parallel/will-cite

RUN npm install -g node-sass \
 && ln -s /usr/local/bin/node-sass /usr/local/bin/sassc

WORKDIR /home/ustwo
COPY package.compiler.json /home/ustwo/package.json
RUN npm install

ENV PATH $PATH:/home/ustwo/node_modules/.bin
COPY src /home/ustwo/src

CMD ["npm", "run", "compile"]
