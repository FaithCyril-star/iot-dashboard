# set the base image to create the image for nuxt app
FROM node:18-alpine3.18

# set the working directory to /app
WORKDIR /app

# copy package.json and package-lock.json to the working directory
COPY package*.json ./

RUN npm install -g npm@10.7.0

# install dependencies
RUN npm install

# copy the rest of the files to the working directory
COPY . .

EXPOSE 3000

RUN npm run build
CMD [ "npm", "run", "start" ]
