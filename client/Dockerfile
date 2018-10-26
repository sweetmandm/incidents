from node:10
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
RUN npm install -g serve
ENV PATH=/usr/src/app/node_modules/.bin:$PATH
COPY . .
COPY src/config.production.ts src/config.ts
RUN npm run build --production
EXPOSE 5000
CMD ["serve", "-s", "build"]
