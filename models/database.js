var config = require('../config')
	, mongojs = require('mongojs');

settings = config.database;

function Database () {
	var db = mongojs(process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || settings.name, ['recipes']);
	this.db = db;
	this.collection = settings.collection;
}

Database.prototype = {
	getSearchResults: function (res, data, callback) {

		var mongo = require('mongodb');

		var mongoUri = process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://localhost/mydb';

		var re = new RegExp(data.searchTerm, "i");
		mongo.Db.connect(mongoUri, function (err, db) {
		  db.collection('recipes', function(er, collection) {
		    collection.insert({'name': re}, {safe: true}, function(er,rs) {
		    	if(er) {
		    		callback(true, data);
		    		return;
		    	};
		    	data.recipes = rs;
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