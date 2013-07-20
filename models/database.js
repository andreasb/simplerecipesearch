var config = require('../config'),
	mongojs = require('mongojs'),
	mongo = require('mongodb'),
	settings = config.database,
	mongoUri = process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || settings.local_db_uri;

function Database () {};

Database.prototype = {
	getRecipes: function (res, data, callback) {
		console.log(data.searchTerm);
		var re = new RegExp(data.searchTerm, "i");
		mongo.Db.connect(mongoUri, function (err, db) {
		  db.collection(settings.collection, function(er, collection) {
		    collection.find({'name': re}).toArray(function(err, items) {
		    	if(er) {
		    		callback(true, data);
		    		return;
		    	};
		    	data.recipes = items;
		    	callback(null, data)
		    });
		  });
		});
	},
	getNumberOfRecipes: function (res, data, callback) {
		mongo.Db.connect(mongoUri, function(err, db) {
			db.collection(settings.collection, function(err, collection) {
				collection.count(function(err, count) {
					if (err) {
						callback(true, data);
						return;
					};
					data.number_of_recipes = count;
					callback(null, data);
				});
			});
		});
	},
	getMoreRecipes: function(data, callback) {
		var re = new RegExp(data.search_term, "i");

		mongo.Db.connect(mongoUri, function (err, db) {
			db.collection(settings.collection, function(er, collection) {
			    collection.find({'name': re}).skip(data.recipes_displayed).limit(100).toArray(function(err, items) {
			    	if(er) {
			    		callback(true, data);
			    		return;
			    	};
			    	data.recipes = items;
			    	callback(null, data)
		    	});
		  	});
		});
	}
};

exports.Database = Database;