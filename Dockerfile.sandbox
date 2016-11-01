FROM node:6.9.1-slim

ENV NODE_PATH /home/ustwo/src

WORKDIR /home/ustwo

RUN mkdir -p /home/ustwo/public
COPY package.sandbox.json /home/ustwo/package.json
RUN npm install --production

COPY src /home/ustwo/src

EXPOSE 8889

CMD ["node", "./node_modules/babel/lib/_babel-node", "src/server/index.sandbox.js"]
