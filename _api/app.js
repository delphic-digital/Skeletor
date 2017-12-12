var restify = require('restify');

/**
 * A simple API server to mock data
 */

var api = restify.createServer();
var mockData = require('./data.json');

api.use(restify.plugins.queryParser());
api.use(restify.plugins.bodyParser());
// api.use(restify.throttle({burst:100,rate:50,ip:true}));

api.get('/', function(req, res, next) {
	res.json(mockData);
	next();
});

//Turns query params into JSON and fires it right back at you
//eg http://localhost:9001/params?key1=value1&key2=value2 returns {key1: "value1",key2: "value2"}
api.get('/params', function(req, res, next) {
	res.json(req.query);
	next();
});

api.get('/hello/:name', function(req, res, next) {
	res.json({
		'hello': req.params.name
	});
	next();
});

api.listen(9001, function() {
	console.log('API listening: ', api.url);
});