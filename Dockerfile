## STAGE 1: Build web
FROM node:14.17.0-alpine AS nodebuild
WORKDIR /src

COPY package.json package.json
COPY lerna.json lerna.json
COPY yarn.lock yarn.lock
COPY ["./src/objective-tracker/package.json", "src/objective-tracker/package.json"]

RUN yarn install --frozen-lockfile
COPY . .

WORKDIR /src/src/objective-tracker
ARG PUBLIC_URL 
ENV PUBLIC_URL $PUBLIC_URL

RUN yarn build
RUN mv "./build" /app

## STAGE 2: Production Environment ###
FROM nginx:1.18-alpine
RUN rm -rf /etc/nginx/conf.d
COPY ["./.devops/conf", "/etc/nginx"]
COPY --from=nodebuild /app/index.html /usr/share/nginx/html
COPY --from=nodebuild /app /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
