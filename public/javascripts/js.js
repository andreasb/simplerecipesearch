var socket = io.connect('http://localhost');
// Keep a count of the recipes that are displayed
var currentCount = 100;

// Call this when a button for more recipes is pressed
socket.emit('requestForMoreRecipes', { count: currentCount });

// Load the recipes in the view when they are recieved
socket.on('incomingRecipes', function (data) {
	console.log(data.recipes);
	currentCount += 100;
	console.log(currentCount);
});