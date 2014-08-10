var mongoose = require("mongoose");

exports.list = function(req, res){
  mongoose.model('users').find(function(error, users){
    if(error){
      
    } else{
      res.send(users);
    }
  });
};