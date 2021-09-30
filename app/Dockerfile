FROM node:16-alpine

WORKDIR /srv

COPY package.json webpack.env.js webpack.dev.js /srv/

RUN npm install

COPY plugins /srv/plugins/

COPY src /srv/src/

CMD ["npm start"]
