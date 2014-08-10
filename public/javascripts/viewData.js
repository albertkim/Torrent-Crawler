var ViewData = (function(){

	var self = this;
	var config = {};

	var init = function(settings){
		console.log("ViewData init");
		var defaults = {

		};
		$.extend(config, defaults, settings);

		// Set handler for form submit button
		$("#testSubmitButton").on("click", function(){
			var title = $("#testNameInput").val();
			var magnet = $("#testMagnetInput").val();
			console.log("Test submit button clicked");
			$.ajax({
				url: "/viewDataActions",
				type: "POST",
				data: {
					title: title,
					magnet: magnet
				},
				success: function(data){
					// Expected: all table results in JSON format
					console.log("Success");
					console.log(data);
					// For now, just refresh the page
					// location.reload();
					// Later, re-render the table with the json data, using Handlebars.js

				}
			});
		});
	};

	return{
		init: init
	};

})();