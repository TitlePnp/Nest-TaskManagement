FROM node:20-alpine

WORKDIR /usr/src/app

COPY package*.json ./
COPY entrypoint.sh ./

RUN apk add --no-cache postgresql-client
RUN npm install
RUN chmod +x entrypoint.sh

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["./entrypoint.sh"]