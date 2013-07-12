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
		if (err) {
			data.numberOfResults = 0;
			res.render('search', data);
			return;
		};
		data.numberOfResults = data.recipes.length;
		if (data.numberOfResults > 1000) {
			data.recipes = data.recipes.slice(0, 999);
		};
		res.render('search', data);
	});
};