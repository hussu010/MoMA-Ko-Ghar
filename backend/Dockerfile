FROM node:16-alpine AS builder
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

FROM node:16-alpine AS final
WORKDIR /app
COPY --from=builder ./app/dist ./dist
COPY package*.json ./
RUN npm install --omit=dev
ENV PORT=4200
ENV DATABASE_URL=postgres://postgres:password@db:5432/postgres
EXPOSE 4200
CMD [ "npm", "start" ]
