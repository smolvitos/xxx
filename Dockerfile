FROM node:latest

WORKDIR /app
RUN mkdir app
COPY notes /app
RUN npm install
RUN npm i --save sqlite3

EXPOSE 1111
CMD ["npm", "run", "prod"]