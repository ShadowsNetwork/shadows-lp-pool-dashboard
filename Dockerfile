# pull official base image
FROM node:13.12.0-alpine

# set working directory
WORKDIR /app

EXPOSE 3000
# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install --silent

# add app
COPY . ./


# start app
CMD ["node", "server.js"]