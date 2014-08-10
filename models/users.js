var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var usersSchema = new Schema({
	userId: Number,
	name: String,
	password: String
});

mongoose.model('users', usersSchema);