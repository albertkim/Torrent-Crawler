var mongoose = require("mongoose");

exports.init = function(request, response){
	var torrentModel = mongoose.model("torrents");
	var allTorrents = torrentModel.find(function(error, torrents){
		if(error){
			console.log("Error retrieving torrents");
			console.log(error);
		} else{
			response.render("viewData", {data: torrents});
		}
	});
};