#stage 1 build the app
FROM node:24-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

RUN npm run build

#stage 2
FROM nginx:stable-alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY 50x.html /usr/share/nginx/html/50x.html
CMD ["nginx", "-g", "daemon off;"]