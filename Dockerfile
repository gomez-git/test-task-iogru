FROM node:16.16-alpine3.16

WORKDIR /app

COPY package.json .
COPY package-lock.json .

RUN npm ci --production

COPY . .

CMD ["npm", "start"]
