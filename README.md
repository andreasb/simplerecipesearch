[Simple Recipes Search](http://simplerecipesearch.com/) is a simple search engine for [Open Recipes](http://openrecip.es/).

Feel free to fork, hack, and submit pull requests.

### Installation

1. Fork the repo

2. Clone your repo

    git clone https://github.com/[your-username]/simplerecipesearch.git`

3. Enter the directory

    cd simplerecipesearch

4. Install dependencies
    
    npm install -d

5. Download the recipes from [Open Recipes](http://openrecip.es/) and [import them into your MongoDB](http://docs.mongodb.org/manual/reference/program/mongoimport/).

6. Create a `config.js` based on `config.example.js` and your DB info.

7. Run the app

    node app