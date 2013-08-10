[Simple Recipes Search](http://simplerecipesearch.com/) is a simple search engine for [Open Recipes](http://openrecip.es/).

Feel free to fork, hack, and submit pull requests.

### Installation

1. Clone the repo with `git clone https://github.com/andreasb/simplerecipesearch.git`, or from your own fork.
2. Install dependencies with `cd simplerecipesearch && npm install -d`.
3. Download the recipes from [Open Recipes](http://openrecip.es/) and [put them into MongoDB](http://docs.mongodb.org/manual/reference/program/mongoimport/).
4. Create a `config.js` based on `config.example.js` and your DB info.
3. Run the app: `node app`.