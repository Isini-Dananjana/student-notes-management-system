FROM node:16-alpine
# Create app directory
WORKDIR /usr/src/app

#copy the package json to the app directory
COPY package*.json /usr/src/app/

#install dependencies
RUN npm ci --only=production

#COPY SOURCE FILES
COPY . /usr/src/app

EXPOSE 8070

CMD [ "node", "index.js" ]