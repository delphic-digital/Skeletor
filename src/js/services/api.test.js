import test from 'ava';
import request from 'supertest';
import schema from 'validate'; //https://www.npmjs.com/package/validate

const api = request('https://jsonplaceholder.typicode.com'); //https://jsonplaceholder.typicode.com/
const postSchema = schema({
	'userId': {
		type: 'number',
		required: true,
		message: 'userId is required'
	},
	'id': {
		type: 'string',
		required: true,
		message: 'userId is required'
	},
	'title': {
		type: 'string',
		required: false,
		message: 'A title would be really good'
	},
	'body': {
		type: 'string',
		required: false,
		message: 'a body would be nice'
	}
});

test.cb('api /posts/1', (t) => {
	t.plan(1);

	api.get('/posts/1')
		.end(function (err, res) {
			let schemaErrors = postSchema.validate(res.body);
			t.true(schemaErrors.length == 0, schemaErrors);
			t.end();
		});
});