var model = require('../models/database.js');
var db = new model.Database();
var mongo = require('mongodb');
var BSON = mongo.BSONPure;
var url = require('url');

exports.index = function(req, res){
	var pathname = url.parse(req.url).pathname.substring(1).split('/');
	var searchQuery = decodeURIComponent(pathname[0].replace('+', '%20'));

	var data = {
		title: "recipes",
		searchTerm: searchQuery
	};

	db.getSearchResults(res, data, function(err, data) {
		var count = 0;
		data.numberOfResults = data.recipes.length;
		res.render('search', data);
	});
};