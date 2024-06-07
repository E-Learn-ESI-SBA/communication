FROM node:lts-slim

# Install Yarn using the official Yarn package
RUN apt-get update && apt-get install -y curl \
    && curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - \
    && echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list \
    && apt-get update && apt-get install -y yarn

WORKDIR /app
COPY package*.json ./
RUN yarn install
USER nodejs
COPY . .
RUN yarn build

EXPOSE 8080
CMD [ "yarn", "start:prod" ]
