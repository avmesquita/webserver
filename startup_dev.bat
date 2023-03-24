@ECHO OFF
SET PORT=3000
SET NODE_ENV=development
SET NODE_DEBUG=i18n:*,cluster,net,http,fs,tls,module,timers,node,server.js
nodemon -e js,css,html,mjb --inspect ./src/server.js