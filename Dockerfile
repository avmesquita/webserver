FROM debian:latest as avm-webserver-node16

RUN apt-get update
RUN apt-get install -y apt-transport-https \
    ca-certificates \
    curl gnupg2 \
    software-properties-common
RUN curl -sL https://deb.nodesource.com/setup_16.x | bash -    

ENV DEBIAN_FRONTEND=noninteractive
ARG DEBIAN_FRONTEND=noninteractive
ENV CACHEBUST=1
ARG CACHEBUST=1

RUN apt-get update
RUN apt-get install -y --no-install-recommends apt-utils 
RUN apt-get install -y --no-install-recommends nodejs
RUN apt-get install -y --no-install-recommends vim
RUN apt-get install -y --no-install-recommends mc
RUN apt-get install -y --no-install-recommends python
RUN apt-get install -y --no-install-recommends build-essential
RUN apt-get install -y --no-install-recommends supervisor
RUN apt-get install -y sudo

COPY package.json  .

RUN npm install 
RUN sudo npm install nodemon -g
RUN sudo npm install pm2 -g

FROM avm-webserver-node16

LABEL org.label-schema.schema-version="1.0"
LABEL org.label-schema.docker.cmd="docker run -d -p 3000:3000 --name webserver"

RUN adduser --system app --home /app
USER app
WORKDIR /app
COPY --chmod=765 . /app
COPY --chmod=765 --from=dependencies node_modules ./node_modules
COPY --chmod=777 ./startup-*.sh /app

CMD ./startup-dev.sh

EXPOSE 3000
