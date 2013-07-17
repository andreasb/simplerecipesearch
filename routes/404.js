exports.index = function(req, res){
	var data = {title: "404"};
	res.render('404', data);
};