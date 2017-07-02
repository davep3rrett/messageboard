var mongoose = require('mongoose');

var topicSchema = mongoose.Schema({
	title: String,
	posts: [{ body: String, date: Date, username: String }],
	dateCreated: { type: Date, default: Date.now },
	username: String,
});

var Topic = mongoose.model('Topic', topicSchema);
module.exports = Topic;