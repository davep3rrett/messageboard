var express = require('express');
var router = express.Router();

var Topic = require('../models/topic.js');

var id; // initialize global so both get and post can access it

router.get('/', function(req, res, next) {
	id = req.query.id; // save topic id for later use in post()
	res.render('new-post');
});

router.post('/', function(req, res, next) {
	if(id === undefined) {
		console.error("couldn't get post id, redirecting to home...");
		return res.redirect(303, '/');
	}
	// add a new "posts" sub document to the document (topic), 
	// using MongooseArray#push method
	Topic.findById(id, function(err, doc) {
		doc.posts.push({ body: req.body.body, date: Date.now(), username: req.body.username });
		doc.save(function(err) {
			if(err) console.error(err);
			return res.redirect(303, '/topic?id=' + id);
		});
	});
});

module.exports = router;