var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var torrentsSchema = new Schema({
	id: Number,
	magnet: String,
	seeders: Number,
	leechers: Number,
	title: String
});

mongoose.model("torrents", torrentsSchema);