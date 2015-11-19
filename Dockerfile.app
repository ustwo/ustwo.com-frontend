FROM ustwo/nodejs:4.1.1
MAINTAINER Arnau Siches <arnau@ustwo.com>

ENV NODE_PATH /home/ustwo/src

COPY package.app.json /home/ustwo/package.json
RUN npm install --production
COPY src /home/ustwo/src
RUN mkdir -p /home/ustwo/public

EXPOSE 8888

CMD ["node", "./node_modules/babel/lib/_babel-node", "--optional", "es7.classProperties", "src/server"]
