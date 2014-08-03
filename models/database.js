var config = require('../config'),
	mongojs = require('mongojs'),
	mongo = require('mongodb'),
	settings = config.database,
	mongoUri = process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || settings.local_db_uri;

function Database () {
	this.defaultLimit = 100;
	this.defaultSkip = 0;
};

Database.prototype = {

	getRecipes: function(data, callback) {
		/* data object should include a `searchTerm`
		 and can include `limit` and `skip` params
		 for pagination */

		var limit = data.limit || this.defaultLimit;
		var skip = data.skip || this.defaultSkip;
		var re = new RegExp(data.searchTerm, "i");

		mongo.Db.connect(mongoUri, function (err, db) {
			db.collection(settings.collection, function(er, collection) {
			    collection
			    	.find({'name': re})
			    	.skip(skip).limit(limit)
			    	.toArray(function(err, items) {
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