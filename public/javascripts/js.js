var socket = io.connect(window.location.origin);
var currentCount = 100;
var path = window.location.pathname;
var search_term = path.substr(1, path.lastIndexOf('/') - 1);

// Hides the 'more' button if there are 100 or less to display
$(document).ready(function(){
	var recipes = $('#numberOfResults').attr('count');
	if (recipes <= 100) {
		$('.moreButton').hide();
	}
});

// When the 'more' button is pressed, this is called
function getMoreRecipes () {
	socket.emit('requestForMoreRecipes', {
		search_term: search_term,
		recipes_displayed: currentCount
	});
	$('.moreButton').text("loading...");
};

// Load the recipes in the view when they are recieved
socket.on('moreRecipes', function (data) {
	var recipe;
	for (i in data.recipes) {
		recipe = data.recipes[i];
		var insertAt = currentCount - 1;
		$('#list li:nth-child(' + insertAt + ')').after('<li class="recipelist"><div class="result"><a href=""><span>' + recipe.name + '</span></a></div></li>');
	};

	$('.moreButton').text("more");

	currentCount += 100;

	// Hides the more button if there are no more recipes
	var number_of_recipes = $('.number').text();
	if (currentCount > number_of_recipes) {
		$('.moreButton').hide();
	};
});

// Display / hide the description
function expandRecipe(id) {
	if ($("#description" + id).is(":hidden")) {
		$("#description" + id).slideDown(100);
		$("#arrow" + id).attr('src', '/images/up.png');
		console.log($("#arrow" + id).attr('src'));
	} else {
		$("#description" + id).slideUp(100);
		$("#arrow" + id).attr('src', '/images/down.png');
	}
};