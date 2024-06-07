FROM node:lts-slim

# Install Yarn
RUN npm install -g yarn

WORKDIR /app
COPY package*.json ./
RUN yarn install
USER nodejs
COPY . .
RUN yarn build

EXPOSE 8080
CMD [ "yarn", "start:prod" ]
