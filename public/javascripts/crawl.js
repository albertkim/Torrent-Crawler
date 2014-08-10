var Crawl = (function(){

	var self = this;
	var config = {};

	var init = function(settings){
		console.log("Crawl init");
		console.log(settings);
		var defaults = {

		};
		$.extend(config, defaults, settings);

		// Init start crawl button
		$(".btn-lg").on("click", function(){
			$.ajax({
				url: "/crawlActions",
				type: "POST",
				data: {},
				success: function(data){
					console.log("Success!");
					console.log(data);
				}
			});
		});

	};

	return {
		init: init
	}

})();