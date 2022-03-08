## STAGE 1: Build web
FROM node:14.17.0-alpine AS nodebuild
WORKDIR /src

COPY package.json package.json
COPY lerna.json lerna.json
COPY yarn.lock yarn.lock
COPY ["./src/objective-tracker/package.json", "src/objective-tracker/package.json"]

RUN yarn install --frozen-lockfile
COPY src src
copy .env .env
COPY node_modules node_modules

WORKDIR /src/src/objective-tracker
ARG API_URL 
ENV API_URL $API_URL

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
