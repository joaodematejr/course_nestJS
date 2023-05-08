FROM --platform=linux/amd64 node:18.4.0-alpine3.16
 
WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

RUN npx prisma generate

EXPOSE 3000

CMD ["npm", "run", "dev"]