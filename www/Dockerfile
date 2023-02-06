FROM node:14-alpine
WORKDIR /app
COPY package.json .
RUN ["npm", "install"]
COPY src ./src
EXPOSE 3005
CMD [ "npm", "start" ]