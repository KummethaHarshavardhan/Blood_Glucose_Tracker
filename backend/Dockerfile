
FROM node:24-bookworm-slim

WORKDIR /app

# Install OpenSSL for Prisma
RUN apt-get update \
    && apt-get install -y --no-install-recommends openssl ca-certificates \
    && rm -rf /var/lib/apt/lists/*

COPY package*.json ./
RUN npm install

COPY prisma ./prisma
RUN npx prisma generate

COPY . .

EXPOSE 7005

CMD ["npm", "start"]
