var restify = require('restify');

/**
 * A simple API server to mock data
 */

function respond(req, res, next) {
	res.json({
		'hello': req.params.name
	});
	next();
}

var api = restify.createServer();
api.get('/hello/:name', respond);
api.head('/hello/:name', respond);

api.listen(9001, function() {
	console.log('%s listening at %s', api.name, api.url);
});