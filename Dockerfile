FROM node:20-alpine

WORKDIR / app

COPY package*.json ./

RUN npm ci --only=production --ignore-scripts

COPY . .

EXPOSE 3001

USER node

ENTRYPOINT [ "node", "./server.js" ]