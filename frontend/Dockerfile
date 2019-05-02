FROM node:10.15.3-alpine as helper
WORKDIR /workspace/app
COPY package.json .
COPY yarn.lock .
RUN yarn
COPY . .
RUN yarn build




FROM nginx:1.15.9-alpine
COPY --from=helper /workspace/app/build /usr/share/nginx/html
COPY --from=helper /workspace/app/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
