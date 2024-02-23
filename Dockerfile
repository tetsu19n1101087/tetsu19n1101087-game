FROM node:18
WORKDIR /app
COPY package.json yarn.lock .yarnrc.yml ./
COPY .yarn/releases/yarn-4.1.0.cjs .yarn/releases/
RUN yarn install --network-timeout 600000
COPY . .
CMD ["yarn", "start"]
EXPOSE 3000