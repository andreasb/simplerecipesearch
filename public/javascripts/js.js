var socket = io.connect('http://localhost');
// Keep a count of the recipes that are displayed
var currentCount = 100;

var path = window.location.pathname;
var search_term = path.substr(1, path.lastIndexOf('/') - 1);

// Call this when a button for more recipes is pressed
socket.emit('requestForMoreRecipes', {
	search_term: search_term,
	recipes_displayed: currentCount
});

// Load the recipes in the view when they are recieved
socket.on('moreRecipes', function (data) {
	console.log(data.recipes);
	currentCount += 100;
});