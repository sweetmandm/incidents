from node:10
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
ENV PORT="8080"
EXPOSE 8080
RUN npm run tsc
CMD ["npm", "run", "serve"]
