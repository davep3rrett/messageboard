var express = require('express');
var router = express.Router();

var Topic = require('../models/topic.js');


router.get('/*', function(req, res, next) {

  // grab the last portion of the topic url, so we can
  // look up the topic in the database by _id property
  const splitUrl = req.originalUrl.split('/');
  const id = splitUrl[splitUrl.length - 1];
  Topic.findById(id, function(err, topic){
    if(err) console.err(err); // laziest possible error handling, sorry


    console.log(topic);

    // var context;
    // TODO: abstract this database mapping context thing into its own function,
    // currently duplicating code between here and routes/index.js
    // const context = {
    //   topic: topic.map(function(topic){
    //     return {
    //       _id: topic._id,
    //       title: topic.title,
    //       posts: topic.posts,
    //       dateCreated: topic.dateCreated,
    //     }
    //   })
    // };
    res.render('topic-single', topic);
  });
});

module.exports = router;