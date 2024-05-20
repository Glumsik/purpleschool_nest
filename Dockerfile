FROM node:16.17-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run lint

RUN npm run build
RUN npm prune --production

CMD [ "node", "dist/main.js" ]
