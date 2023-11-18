FROM node:18-alpine

WORKDIR /rafael-test-api

COPY package.json .

RUN npm i -g pnpm
RUN pnpm install

COPY . .

RUN pnpm run build

CMD ["pnpm", "run", "start:prod"]