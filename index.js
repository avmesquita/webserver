const express = require('express');
const serve   = require('express-static');
const favicon = require('serve-favicon');
const compression = require('compression');

const app = express();

app.use(compression());
app.use(favicon(__dirname + '/wwwroot/favicon.ico'));
app.use(serve(__dirname + '/wwwroot/index.html'));

const server = app.listen(3000, function(){
  console.log('Webserver is running at %s', server.address().port);
});
