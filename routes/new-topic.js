var express = require('express');
var router = express.Router();

var Topic = require('../models/topic.js');

router.get('/', function(req, res, next) {
  res.render('new-topic');
});

router.post('/', function(req, res, next) {
  new Topic({
    title: req.body.title,
    posts: [{ body: req.body.body, username: req.body.username, date: Date.now() }],
    dateCreated: Date.now(),
    username: req.body.username,
  }).save();

  return res.redirect(303, '/');
});

module.exports = router;