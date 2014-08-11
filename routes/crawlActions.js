var request = require("request");
var mongoose = require("mongoose");
var cheerio = require("cheerio");
var http = require("http");
var gunzip = require("zlib").createGunzip();

exports.get = function(req, res){

  res.send("crawlActions get call");
};

exports.post = function(req, res){
	var torrentModel = mongoose.model("torrents");

  // Web scraping functionality
  url = "http://kickass.to/tv/";
  console.log("Requesting crawl of " + url);

  download(url, function(html){
  	if(html){
    	console.log("Torrent crawl completed");
      // Using cheerio will give the returned html jquery functionality
      var $ = cheerio.load(html);
      // Data will be stored as:
      // [{title, magnet, seeders, leechers}, {...}, {...}]
      var torrents = [];
      var torrentElements = $("[id^='torrent_tv_torrents']");

      torrentElements.each(function(index, element){
        var title = $(this).find(".torrentname div a").html();
        var magnet = $(this).find("[title='Torrent magnet link']").attr("href");
        var seeders = $(this).find(".green").html();
        var leechers = $(this).find(".red").html();
        var singleTorrent = {
        	date: new Date(),
          title: title,
          magnet: magnet,
          seeders: seeders,
          leechers: leechers
        };
        singleTorrent = new torrentModel(singleTorrent);
        singleTorrent.save(function(error, torrent){
        	if(error){
        		console.log("Error when trying to save torrent");
        		console.log(error);
        		console.log(torrent);
        	} else{
        		console.log("Torrent saved");
        	}
        });
        torrents.push(singleTorrent);
  		});
  		res.send(torrents);
  	}
  });

	function download(url, callback) {
	  http.get(url, function(res) {
	  	res.pipe(gunzip);
	    var data = "";
	    gunzip.on('data', function (chunk) {
	      data += chunk;
	    });
	    gunzip.on("end", function() {
	      callback(data);
	    });
	  }).on("error", function() {
	    console.log("HTTP get failed");
	  });
	}

}