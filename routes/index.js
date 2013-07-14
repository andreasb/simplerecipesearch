var model = require('../models/database.js');
var db = new model.Database();
var mongo = require('mongodb');
var BSON = mongo.BSONPure;

exports.index = function(req, res){
	var data = {title: "Simple Recipe Search"};

	db.getNumberOfRecipes(res, data, function(err, data) {
		if (err) {
			data.number_of_recipes = 'na'
		};
		res.render('index', data);
	});
};