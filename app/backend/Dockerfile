# Base image
FROM node:18

# Atualize os repositórios e instale o ffmpeg usando apt-get
RUN apt-get update && apt-get install -y ffmpeg lsof

# Create app directory
WORKDIR /app-backend

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./
COPY yarn.lock ./

# Install app dependencies
RUN yarn install

ENV NODE_ENV production

# Bundle app source
COPY . .

# Generate prisma types
RUN yarn prisma generate

# Creates a "dist" folder with the production build
RUN yarn build

EXPOSE 3001

# Start the server using the production build
CMD [ "node", "dist/main.js" ]

