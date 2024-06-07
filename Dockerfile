FROM node
WORKDIR /app
COPY package*.json ./
RUN npm install -g npm@latest
RUN npm install
COPY . .
RUN npm run build

EXPOSE 8080
CMD [ "npm", "run","start","--loglevel=verbose" ]
