FROM node:18
WORKDIR /app
ENV NODE_ENV=docker
RUN yarn add express
COPY app.js ./
CMD ["node", "app.js"]
EXPOSE 5000