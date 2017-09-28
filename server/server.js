var fs = require('fs');
var http = require('http');
var jsonServer = require('json-server');
var express = require('express');
var bodyParser = require('body-parser');

var router = jsonServer.router('server/data.json');
var jsonConfig = JSON.parse(fs.readFileSync('server/data.json', 'utf8'));
var middlewares = jsonServer.defaults();
var app = express();

app.use(middlewares);
app.use(bodyParser.json());
app.use(function (req, res) {
	setTimeout(function () {
		var params = req.body;
		var data = jsonConfig[params.name];
		res.send(JSON.stringify({result: data === undefined ? true : data}));
	}, 1000);
});

app.use('/api', router);

http.createServer(app).listen(8443, function () {
	console.log('|-----------------------------------------------------------------------------------|');
	console.log('| The server is listening on a 8443 port...                                         |');
	console.log('| An application is available on the link "http://localhost:8443/api/"             |');
	console.log('|-----------------------------------------------------------------------------------|');
	console.log();
});
