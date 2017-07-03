var express = require('express');
var router = express.Router();

var Topic = require('../models/topic.js');


router.get('/', function(req, res, next) {
  const id = req.query.id;
  Topic.findById(id, function(err, topic){
    if(err) console.error(err); // laziest possible error handling, sorry
    res.render('topic-single', topic);
  });
});

module.exports = router;