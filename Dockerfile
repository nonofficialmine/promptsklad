FROM node:22-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY tsconfig.json rspress.config.ts ./
COPY api ./api
COPY content ./content
COPY posts ./posts
COPY site ./site
COPY theme ./theme
RUN npm run build

FROM nginx:1.27-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/doc_build /usr/share/nginx/html
EXPOSE 80
