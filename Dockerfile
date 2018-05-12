FROM kkarczmarczyk/node-yarn AS build

WORKDIR /wasgeit-frontend

ADD . .
RUN yarn install
RUN yarn build

FROM nginx

COPY --from=build /wasgeit-frontend/dist/ /usr/share/nginx/html

COPY wasgeit-nginx.conf /etc/nginx/conf.d/default.conf
