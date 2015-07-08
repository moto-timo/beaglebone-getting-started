var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var term = require('term.js');
var ssh = require('ssh2');

var ssh_host = '192.168.7.2';
var ssh_port = '22';
var ssh_username = 'root';
var ssh_password = '';

server.listen(8000);

app.use(express.static(__dirname + '/public'));
app.use(term.middleware());

io.on('connection', function (socket) {
  socket.on('data', function(command) {
    var conn = new ssh();

    conn.on('ready', function() {
      console.log("command: " + command);

      conn.exec(command, function(err, stream) {
        if (err)
          return socket.emit('data', '\nssh error: ' + err.message + '\n');

        stream.on('data', function(d) {
          socket.emit('data', d.toString('binary'));
        }).on('close', function() {
          conn.end();
        });
      });
    }).connect({
      host: ssh_host,
      port: ssh_port,
      username: ssh_username,
      password: ssh_password,
    });
  });
});