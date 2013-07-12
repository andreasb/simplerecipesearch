var config = require('../config')
	, mongojs = require('mongojs');

settings = config.database;

function Database () {
	var db = mongojs(settings.name, [settings.collection]);
	this.db = db;
	this.collection = settings.collection;
}

Database.prototype = {
	getSearchResults: function (res, data, callback) {
		var re = new RegExp(data.searchTerm, "i");
		this.db.recipes.find({name: re} , function(err, docs) {
    		var result = docs;
    		data.recipes = result;
    		callback(null, data);
		});
	}
}

exports.Database = Database;