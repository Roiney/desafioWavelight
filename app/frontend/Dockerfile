# Base image
FROM node:18-alpine

WORKDIR /app-frontend

EXPOSE 3000

COPY . .

RUN npm install --force

RUN npm run format

CMD ["npm","start"]