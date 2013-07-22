var socket = io.connect(window.location.origin);
var currentCount = 100;
var path = window.location.pathname;
var search_term = path.substr(1, path.lastIndexOf('/') - 1);

// When the 'more' button is pressed, this buttom is called
function getMoreRecipes () {
	socket.emit('requestForMoreRecipes', {
		search_term: search_term,
		recipes_displayed: currentCount
	});
};

// Load the recipes in the view when they are recieved
socket.on('moreRecipes', function (data) {
	var recipe;
	for (i in data.recipes) {
		recipe = data.recipes[i];
		$('#list li:nth-child(' + currentCount + ')').after('<li class="recipelist"><div class="result"><a href=""><span>' + recipe.name + '</span></a></div></li>');
	};
	currentCount += 100;
});