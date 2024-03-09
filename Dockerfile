FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci --only=production --ignore-scripts

COPY . .

RUN chown -R node:node /app/public/img

EXPOSE 3001

USER node

ENTRYPOINT [ "node", "./server.js" ]