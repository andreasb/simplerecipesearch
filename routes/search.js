var model = require('../models/database.js');
var db = new model.Database();
var mongo = require('mongodb');
var BSON = mongo.BSONPure;

exports.index = function(req, res){
	var searchQuery = req.params.query;

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
		if (data.numberOfResults > 100) {
			data.recipes = data.recipes.slice(0, 99);
		};
		res.render('search', data);
	});
};