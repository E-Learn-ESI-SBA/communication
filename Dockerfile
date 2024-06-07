FROM node:lts-slim
WORKDIR /app
COPY package*.json ./
RUN npm install -g yarn
RUN yarn install
COPY . .
RUN npm run build

EXPOSE 8080
CMD [ "yarn", "run","start:prod" ]
