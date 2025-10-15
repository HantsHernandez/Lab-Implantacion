FROM node:18-alpine
WORKDIR /app
COPY package.json ./
RUN npm i --omit=dev
COPY src ./src
ENV NODE_ENV=production
EXPOSE 3001
CMD ["node", "src/index.js"]
