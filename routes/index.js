var express = require('express');
var router = express.Router();

var Topic = require('../models/topic.js');

/* GET home page. */
router.get('/', function(req, res, next) {
	Topic.find( function(err, topics) {
		if(err) console.err(err);
		var context = {
			topics: topics.map(function(topic) {
				return {
					title: topic.title,
					posts: topic.posts,
					dateCreated: topic.dateCreated,
				}
			})
		};
		res.render('index', { title: 'message board', context: context, });
	});
});

module.exports = router;
