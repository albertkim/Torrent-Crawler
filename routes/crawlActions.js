var request = require('request');
var mongoose = require("mongoose");
var cheerio = require("cheerio");

exports.get = function(request, response){

  response.send("get response");
};

exports.post = function(request, response){
	// Insert new table data
	// Expected post body: {name, magnet}
	var body = request.body;
	var torrentModel = mongoose.model("torrents");
	var model = new torrentModel(body);

  // Web scraping functionality
  url = "http://kickass.to/tv/";
  console.log("Requesting crawl of " + url);
  request(url, function(error, response, html){
    if(error){
    	console.log("Error caught during crawl");
    	console.log(error);
    } else{
    	console.log("Torrent crawl completed");
      // Using cheerio will give the returned html jquery functionality
      var $ = cheerio.load(html);
      // Data will be stored as:
      // [{title, magnet, seeders, leechers}, {...}, {...}]
      var torrents = [];
      var torrentElements = $("[id^='torrent_tv_torrents']");
      console.log(torrentElements);
      torrentElements.each(function(index, element){
        var title = $(this).find(".torrentname div a").html();
        var magnet = $(this).find("[title='Torrent magnet link']").attr("href");
        var seeders = $(this).find(".green").html();
        var leechers = $(this).find(".red").html();
        var singleTorrent = {
          title: title,
          magnet: magnet,
          seeders: seeders,
          leechers: leechers
        };
        singleTorrent = torrentModel(singleTorrent);
        console.log(singleTorrent);
        // torrentModel.save(singleTorrent);
        torrents.push(singleTorrent);
      });

      response.send(torrents);
      
    }
  });
}