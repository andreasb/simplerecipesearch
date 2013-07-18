var socket = io.connect('http://localhost');

// Call this when a button for more recipes is pressed
socket.emit('requestForMoreRecipes', { count: 100 });

socket.on('incomingRecipes', function (data) {
	// Load the recipes in the view
	console.log(data.recipes);
});