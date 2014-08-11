var ViewData = (function(){

	var self = this;
	var config = {};

	var init = function(settings){
		console.log("ViewData init");
		console.log(settings);
		var defaults = {

		};
		$.extend(config, defaults, settings);

		// Set delete handlers
		$("#deleteAllBtn").on("click", function(){
			$.ajax({
				url: "/viewDataActions",
				type: "POST",
				data: {
					action: "deleteAll"
				},
				success: function(data){
					console.log("Success");
					location.reload();
				}
			});
		});

		// Set handler for delete all button
		$().on("click", function(){

		});

		// Set handler for form submit button
		$("#testSubmitButton").on("click", function(){
			var title = $("#titleInput").val();
			var magnet = $("#magnetInput").val();
			var seeders = $("#seedersInput").val();
			var leechers = $("#leechersInput").val();
			var ips = $("#ipsInput").val();
			$.ajax({
				url: "/viewDataActions",
				type: "POST",
				data: {
					action: "add",
					title: title,
					magnet: magnet,
					seeders: seeders,
					leechers: leechers,
					ips: ips
				},
				success: function(data){
					// Expected: all table results in JSON format
					console.log("Success");
					console.log(data);
					// For now, just refresh the page
					location.reload();
					// Later, re-render the table with the json data, using Handlebars.js?
				}
			});
		});
	};

	return{
		init: init
	};

})();