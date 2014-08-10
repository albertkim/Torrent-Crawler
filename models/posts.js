var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var postsSchema = new Schema({
	postId: Number,
	userId: Number,
	content: String
});

mongoose.model('posts', postsSchema);