var model = require('../models/database.js');
var db = new model.Database();
var mongo = require('mongodb');
var BSON = mongo.BSONPure;

exports.index = function(req, res){
	var data = {title: "Open Recipes Search"};
	db.getSearchResults(res, req, function(err, data) {
		res.render('index', data);
	});
};