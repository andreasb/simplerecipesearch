var config = require('../config')
	, mongojs = require('mongojs');

settings = config.database;

function Database () {
	//var db = mongojs(process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || settings.name, ['recipes']);
	//this.db = db;
	//this.collection = settings.collection;
}

Database.prototype = {
	getSearchResults: function (res, data, callback) {

		var mongo = require('mongodb');

		var mongoUri = 'mongodb://andreasbirkebaek:andreas@ds035358.mongolab.com:35358/heroku_app16874533';
		//var mongoUri = process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://localhost/mydb';

		var re = new RegExp(data.searchTerm, "i");
		mongo.Db.connect(mongoUri, function (err, db) {
		  db.collection('recipes', function(er, collection) {
		    collection.find({'name': re}).toArray(function(err, items) {
		    	console.log(items);

		    	if(er) {
		    		callback(true, data);
		    		return;
		    	};
		    	data.recipes = items;
		    	callback(null, data)
		    });
		  });
		});

		/*
		var re = new RegExp(data.searchTerm, "i");
		this.db.recipes.find({name: re} , function(err, docs) {
    		if (err) {
    			callback(true, data);
    			return;
    		};
    		var result = docs;
    		data.recipes = result;
    		callback(null, data);
		});
		*/
	}
}

exports.Database = Database;