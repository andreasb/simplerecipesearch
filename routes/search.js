var model = require('../models/database.js');
var db = new model.Database();
var mongo = require('mongodb');
var BSON = mongo.BSONPure;

exports.index = function(req, res){
	var searchQuery = req.params.query;

	searchQuery = searchQuery.replace('+', ' ');

	var data = {
		title: searchQuery,
		searchTerm: searchQuery
	};

	db.getRecipes(res, data, function(err, data) {

		if (err) {
			res.render('search', data);
			return;
		};

		if (data.recipes.length > 100) {
			data.recipes = data.recipes.slice(0, 99);
		};

		res.render('search', data);
	});
};

exports.moreRecipes = function(data, callback) {
	db.getMoreRecipes(data, function(err, data) {
		callback(data);
	})
};