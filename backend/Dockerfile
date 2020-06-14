FROM node:12-alpine

WORKDIR /app

COPY . .

RUN yarn install --frozen-lockfile

COPY scripts/start.sh .

CMD ["./start.sh"]
