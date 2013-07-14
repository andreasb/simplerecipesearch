[Simple Recipes Search](http://simplerecipesearch.com/) is a search engine for [Open Recipes](http://openrecip.es/).

The purpose of Simple Recipe search is to provide a way to search through the recipes in a non-filtered and non-distracted way.

### Open Source

The project is open source, so feel free to fork, edit and submit pull requests.

### Installation

1. Clone the repo with `git clone https://github.com/andreasb/simplerecipesearch.git`.
2. Then install dependencies with `cd simplerecipesearch && npm install -d`.
3. Download the recipes from [Open Recipes](http://openrecip.es/) and [put them into MongoDB](http://docs.mongodb.org/manual/reference/program/mongoimport/).
4. Create a `config.js` based on `config.example.js` and your DB info.
3. Run the app: `node app`.

### To Do

* Add a way to navigate back to search from search results page
* ~~Display the total number of recipes on the splash page~~
* ~~Provide a bit of context of the project on the splash page~~
* Better support for mobile browsers
* Add a way to display more recipe info on the site.
  * Idea: reveal ingredients, yield and cooking time by clicking a recipe.
* Add a way to load more recipes. For now only 1000 recipes are displayed.