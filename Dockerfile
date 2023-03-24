FROM debian:latest as dependencies

RUN apt-get update

RUN apt-get install -y apt-transport-https \
    ca-certificates \
    curl gnupg2 \
    software-properties-common

RUN curl -sL https://deb.nodesource.com/setup_16.x | bash -

RUN apt-get update
RUN apt-get install -y apt-utils
RUN apt-get install -y nodejs

COPY package.json  .
RUN npm install 
RUN npm install pm2 -g

#-----------------------------------------------------------------------

FROM dependencies

LABEL org.label-schema.schema-version="1.0"
LABEL org.label-schema.docker.cmd="docker run -d -p 4000:4000 --name webserver --tag webserver-node:latest"

RUN adduser --system app --home /app
USER app
WORKDIR /app
COPY . /app
COPY --from=dependencies node_modules ./node_modules

ENV PORT=3000
ENV NODE_ENV=production

CMD pm2 start ./src/server.js

EXPOSE 3000
