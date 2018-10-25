FROM node:10
RUN mkdir /usr/src/app
WORKDIR /usr/src/app
ADD package*.json ./
RUN npm install
ENV PATH /usr/src/app/node_modules/.bin:$PATH
COPY . .
CMD ["npm", "start"]
