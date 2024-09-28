FROM node:18
WORKDIR /app
ENV NODE_ENV=docker
COPY package.json yarn.lock .yarnrc.yml ./
COPY .yarn/releases/*.cjs .yarn/releases/
RUN yarn install --network-timeout 600000
COPY . .
CMD ["yarn", "start"]
EXPOSE 3000