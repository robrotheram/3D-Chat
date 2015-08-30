#!/usr/bin/env node
var server_port = process.env.OPENSHIFT_NODEJS_PORT || 8080;
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';

var paperboy = require('paperboy'),
  http = require('http'),
  path = require('path');

var webroot = path.join(__dirname, 'app');

http.createServer(function (req, res) {
  var ip = server_ip_address;
  paperboy
    .deliver(webroot, req, res)
    .addHeader('X-Powered-By', 'Atari')
    .before(function () {
      console.log('Request received for ' + req.url);
    })
    .after(function (statusCode) {
      console.log(statusCode + ' - ' + req.url + ' ' + ip);
    })
    .error(function (statusCode, msg) {
      console.log([statusCode, msg, req.url, ip].join(' '));
      res.writeHead(statusCode, {'Content-Type': 'text/plain'});
      res.end('Error [' + statusCode + ']');
    })
    .otherwise(function (err) {
      console.log([404, err, req.url, ip].join(' '));
      res.writeHead(404, {'Content-Type': 'text/plain'});
      res.end('Error 404: File not found');
    });
}).listen(server_port, server_ip_address);

console.log('paperboy on his round at ' + server_ip_address + ':' + server_port);
