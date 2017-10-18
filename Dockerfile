FROM node:latest

# setup environment variable 
ENV PROJECT "test"
ENV NODE_ENV development
ENV NODE_PORT 8080
ENV DEBUG $PROJECT:*

# installing global node module
RUN npm install -g pm2

WORKDIR "/var/www/$PROJECT"
RUN npm install

EXPOSE $NODE_PORT
CMD [ "pm2-docker", "process.json" ]