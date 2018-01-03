FROM node:8.9

ENV NPM_CONFIG_LOGLEVEL warn

ADD package.json yarn.lock /tmp/
RUN cd /tmp && yarn install
RUN mkdir -p /usr/src/api && cd /usr/src/api && ln -s /tmp/node_modules

WORKDIR /usr/src/api
COPY . .

CMD npm run dev
