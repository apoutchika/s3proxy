FROM node:14

COPY . /app
WORKDIR /app

RUN npm i

CMD npm run start

EXPOSE 80
