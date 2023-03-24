#!/bin/sh
export PORT=3000
export NODE_ENV=production
export NODE_DEBUG=
pm2 --no-daemon start ./src/server.js --name webserver
