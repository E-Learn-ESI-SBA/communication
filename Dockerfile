FROM node:lts-slim
WORKDIR /app
COPY package*.json ./
RUN npm install
RUN groupadd -r nodejs && useradd -r -g nodejs nodejs
RUN chown -R nodejs:nodejs /app
USER nodejs
COPY . .
RUN npm run build

EXPOSE 8080
CMD [ "npm", "run","start:prod","--loglevel=verbose" ]
