var mongoose = require("mongoose");

exports.init = function(request, response){
  response.render("viewCharts");
};