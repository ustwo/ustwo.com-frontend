FROM node:6.9.1-slim
MAINTAINER Arnau Siches <arnau@ustwo.com>

ENV NODE_PATH /home/ustwo/src

WORKDIR /home/ustwo

RUN mkdir -p /home/ustwo/public
COPY package.app.json /home/ustwo/package.json
RUN npm install --production

COPY src /home/ustwo/src

EXPOSE 8888

CMD ["node", "./node_modules/babel/lib/_babel-node", "src/server"]
