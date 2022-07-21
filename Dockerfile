FROM node

WORKDIR /app

COPY package.json .

RUN npm i -g npm

RUN npm install --legacy-peer-deps

COPY . .

EXPOSE 3000

CMD [ "npm","start" ]