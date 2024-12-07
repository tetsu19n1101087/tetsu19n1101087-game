FROM node:18
WORKDIR /app
ENV NODE_ENV=docker
COPY package.json ./
RUN yarn install --network-timeout 600000
COPY . .
CMD ["node", "app.js"]
EXPOSE 5000