const express = require('express');
const serve   = require('express-static');
const favicon = require('serve-favicon');
const compression = require('compression');
const os = require('os');

const app = express();

app.on('*', function () {
  res.send('*')
});

app.get('/info', function (req, res) {

  let html = '<HTML><HEAD><TITLE>WEBSERVER INFO</TITLE><meta http-equiv="refresh" content="1"></HEAD><BODY>';
  html += '<TABLE>';
  html += '  <TR>';
  html += '    <TD>__machine</TD>';
  html += '    <TD>'+os.machine()+'</TD>';
  html += '  </TR>';
  html += '  <TR>';
  html += '    <TD>__cpus</TD>';
  html += '    <TD>'+os.cpus().length+'</TD>';
  html += '  </TR>';
  html += '  <TR>';
  html += '    <TD>__platform</TD>';
  html += '    <TD>'+os.platform()+'</TD>';
  html += '  </TR>';
  html += '  <TR>';
  html += '    <TD>__ram</TD>';
  html += '    <TD>'+(os.totalmem() / 1024 / 1024 / 1024)+' GB</TD>';
  html += '  </TR>';
  html += '  <TR>';
  html += '    <TD colspan="2">&nbsp;</TD>';  
  html += '  </TR>';
  html += '  <TR>';
  html += '    <TD>__freemem</TD>';
  html += '    <TD>'+(os.freemem() / 1024 / 1024 / 1024)+' GB</TD>';
  html += '  </TR>';
  html += '  <TR>';
  html += '    <TD>__uptime</TD>';
  html += '    <TD>'+ (os.uptime() / 3600  )+' hours</TD>';
  html += '  </TR>';
  html += '  <TR>';
  html += '    <TD colspan="2">&nbsp;</TD>';  
  html += '  </TR>';
  html += '  <TR>';
  html += '    <TD>__hostname</TD>';
  html += '    <TD>'+ ( os.hostname() )+'</TD>';
  html += '  </TR>';
  html += '  <TR>';
  html += '    <TD>__homedir</TD>';
  html += '    <TD>'+ ( os.homedir()  )+'</TD>';
  html += '  </TR>';
  html += '  <TR>';
  html += '    <TD>__dirname</TD>';
  html += '    <TD>'+ ( __dirname )+'</TD>';
  html += '  </TR>';
  html += '  <TR>';
  html += '    <TD>__filename</TD>';
  html += '    <TD>'+ ( __filename  )+'</TD>';
  html += '  </TR>';
  html += '  <TR>';
  html += '    <TD colspan="2">&nbsp;</TD>';  
  html += '  </TR>';
  html += '  <TR>';
  html += '    <TD>__network</TD>';

  let netTable = "<TABLE>";
  const nets = os.networkInterfaces();
  const netInterfaces = Object.keys(nets);
  const netInterfacesValues = Object.values(nets);
  netInterfaces.forEach( (value, index, array) => {    
    netTable += "<TR>";
    netTable += "  <TD>"+value+"</TD>";    
    netTable += "  <TD>"+netInterfacesValues[index][1].address+"</TD>";
    netTable += "</TR>";        
  });
  netTable += "</TABLE>";

  html += '    <TD>'+ ( netTable  )+'</TD>';
  html += '  </TR>';
  html += '</TABLE>';
  html += '</BODY></HTML>';

  res.send(html);
});

app.use(compression());
app.use(favicon(__dirname + '/wwwroot/favicon.ico'));
app.use(serve(__dirname + '/wwwroot/index.html'));

const server = app.listen(3000, function(){
  console.log('WEBSERVER IS RUNNING!');
  console.log('PORT => ', server.address().port);
});
