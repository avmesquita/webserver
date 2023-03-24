#!/bin/sh
export PORT=3000
export NODE_ENV=development
export NODE_DEBUG=i18n:*,cluster,net,http,fs,tls,module,timers,node,server.js
#use pm2 (pm2-runtime for azure) to server | use nodemon to development mode
#pm2 --no-daemon start ./index.js --name webserver
nodemon -e js,css,html,mjb --inspect ./src/server.js
