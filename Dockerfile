FROM node:12-slim
WORKDIR /usr/src/app

# 复制package.json和package-lock.json（如果有的话）
COPY package*.json ./

# 安装依赖
RUN npm install --only=production

# 复制项目代码
COPY . .

# 设置启动命令
CMD ["node", "index.js"]
