var mongoose = require("mongoose");

exports.get = function(request, response){

  response.send("get response");
};

exports.post = function(request, response){
	// Insert new table data
	// Expected post body: {name, magnet}
	var body = request.body;
	console.log(body);

	if(body.action == "add"){
		console.log("Adding test torrent");
		var torrentModel = mongoose.model("torrents");
		var model = new torrentModel(body);
		model.save(function(error, torrents){
			if(error){
				console.log("Error saving torrent mode");
				console.log(error);
			} else{
				console.log(torrents);
			}
		});
		response.send("post response");
	}

	else if(body.action == "deleteAll"){
		console.log("Deleting all torrents");
		var torrentModel = mongoose.model("torrents");
		torrentModel.find(function(error, allTorrents){
			for(var i=0; i<allTorrents.length; i++){
				torrentModel(allTorrents[i]).remove();
			}
		});
	}
}