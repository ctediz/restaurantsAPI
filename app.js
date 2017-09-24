var express = require('express');
var mongoose = require('mongoose');

var db = mongoose.connect('mongodb://localhost/restaurant', {useMongoClient: true});

var app = express();
var port = process.env.PORT || 5000;

var Restaurant = require('./models/restaurantModel');
var restaurantRouter = require('./routes/restaurantRoutes')(Restaurant);

app.use('/restaurants', restaurantRouter);

app.get('/', function(req, res) {
    res.send('Welcome!');
});

app.listen(port, function() {
    console.log('Listening on port ' + port);
});