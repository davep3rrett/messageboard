var express = require('express');
var router = express.Router();

var Topic = require('../models/topic.js');

/* GET home page. */
router.get('/', function(req, res, next) {
	const conditions = null;
	const projection = '_id title posts dateCreated username';
	const options = {sort: { dateCreated: -1 } };
	const cb = function(err, doc) {
		if(err) console.error(err);
		console.log(JSON.stringify(doc));
		res.render('index', { topics: doc });
	};

	Topic.find(conditions, projection, options, cb);
});

module.exports = router;
