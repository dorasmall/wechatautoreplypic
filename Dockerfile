FROM node:12-slim
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm config set registry https://registry.npm.taobao.org
RUN npm install --only=production
COPY . ./
CMD ["node", "index.js"]
