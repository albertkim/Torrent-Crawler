var mongoose = require("mongoose");

exports.get = function(request, response){

  response.send("get response");
};

exports.post = function(request, response){
	// Insert new table data
	// Expected post body: {name, magnet}
	var body = request.body;
	console.log(body);
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