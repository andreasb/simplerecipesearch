var socket = io.connect(window.location.origin);
var currentCount = 100;
var path = window.location.pathname;
var searchTerm = path.substr(1, path.lastIndexOf('/') - 1);

$(document).ready(function(){
	var recipes = $('#numberOfResults').attr('count');
	if (recipes <= 100) {
		$('.moreButton').hide();
	}
});

function getMoreRecipes () {
	socket.emit('requestForMoreRecipes', {
		searchTerm: searchTerm,
		skip: currentCount
	});
	$('.moreButton').text("loading...");
};

socket.on('moreRecipes', function (data) {
	var recipe;
	for (i in data.recipes) {
		recipe = data.recipes[i];
		var insertAt = currentCount - 1;
		var index = parseInt(currentCount) + parseInt(i) - 1;
		var listElement = '<li><a href="' + recipe.url + '" target="_blank" class="recipe-name">' + recipe.name + '</a> <span class="source">from ' + recipe.source + '</span>'
		if (recipe.description) {
			listElement += '<span class="recipe-description">' + recipe.description + '</span>'
		}
		listElement += '</li>'
		$('#list li:nth-child(' + insertAt + ')').after(listElement);
	};

	$('.moreButton').text("more");

	currentCount += 100;

	// Hides the more button if there are no more recipes
	var number_of_recipes = $('.number').text();
	if (currentCount > number_of_recipes) {
		$('.moreButton').hide();
	};
});