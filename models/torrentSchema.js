var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var torrentSchema = new Schema({
	date: Date,
	title: String,
	magnet: String,
	seeders: Number,
	leechers: Number,
	ips: Number,
});

mongoose.model("torrents", torrentSchema);