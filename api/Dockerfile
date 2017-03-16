FROM node:7.5-slim
# Create app directory
RUN mkdir -p /usr/oauth2/api
WORKDIR /usr/oauth2/api

# Set environment vars
ENV APP_ENV development
ENV TZ Europe/Bucharest

ENV PORT 80
ENV SECRET "snasdnadnfiaufnwiqnfyq394bfqiyefbiqw3bfqiw"

# Install app dependencies
COPY . /usr/oauth2/api

RUN rm -rf node_modules

RUN npm install

RUN npm run migrate

CMD [ "npm", "run", "-s", "start"]