var mongoose = require("mongoose");
var _ = require("underscore");

exports.get = function(request, response){

  response.send("get response");
};

exports.post = function(request, response){
	// Insert new table data
	// Expected post body: {name, magnet}
	var body = request.body;
	console.log(body);
	var torrentModel = mongoose.model("torrents");

	if(body.action == "add"){
		console.log("Adding test torrent");
		var model = new torrentModel(body);
		model.save(function(error, torrents){
			if(error){
				console.log("Error saving torrent mode");
				console.log(error);
			} else{
				console.log(torrents);
				response.send("Test torrent added");
			}
		});
	}

	else if(body.action == "deleteAll"){
		console.log("Deleting all torrents");
		torrentModel.find(function(error, allTorrents){
			for(var i=0; i<allTorrents.length; i++){
				torrentModel(allTorrents[i]).remove();
			}
			response.send("All torrents deleted");
		});
	}

	else if(body.action == "deleteDay"){
		console.log("Getting last date");
		torrentModel.find(function(error, allTorrents){
			if(error){
				console.log("Error caught finding last date");
			} else{
				// Get date of last torrent
				var lastDate = allTorrents[allTorrents.length-1].date;
				var lastDateMinusTenSeconds = lastDate;
				lastDateMinusTenSeconds.setSeconds(lastDateMinusTenSeconds.getSeconds()-10);
				console.log("lastDate: " + lastDate);
				console.log("lastDateMinusOneSecond: " + lastDateMinusTenSeconds);
				torrentModel.find({date: {"$gte": lastDateMinusTenSeconds}}, function(error, torrents){
					if(error){
						console.log("Error caught finding torrents with date " + lastDate);
					} else{
						console.log("Number of torrents getting removed: " + torrents.length);
						for(var i=0; i<torrents.length; i++){
							torrentModel(torrents[i]).remove();
						}
					}
					response.send("Last batch of torrents deleted");
				});
			}
		});
	}
}