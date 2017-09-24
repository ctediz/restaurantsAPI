var restaurantController = function(Restaurant) {

    // Base Route
    var post = function(req, res) {
        var restaurant = new Restaurant(req.body);
        restaurant.save();
        restaurant.status(201);
        res.json(restaurant);
    };

    var getAll = function(req, res) {
        var filter = require('../helpers/restaurantFilters');
        var query = filter.filter(req);
        Restaurant.find(query, function(err, restaurants) {
            if(err) {
                console.log(err);
                res.status(500).send(err);
            }
            else {
                res.json(restaurants);
            }
        });
    };

    // Single Routes
    var put = function(req, res) {
        var restaurant = require('../models/restaurantModel');
        // loop over properties
        restaurant.schema.eachPath(function(path) {
            if(path != '_id' && path != '__v') {
                req.restaurant[path] = req.body[path];
            }
        });

        req.restaurant.save(function(err) {
            if(err) {
                console.log(err);
                res.status(500).send(err);
            }
            else {
                res.json(req.restaurant);
            }
        });
    };

    var patch = function(req, res) {
        if(req.body._id) {
            delete req.body._id;
        }
        if(req.body.__v) {
            delete req.body.__v;
        }

        for(var p in req.body) {
            req.restaurant[p] = req.body[p];
        }

        req.restaurant.save(function(err) {
            if(err) {
                console.log(err);
                res.status(500).send(err);
            }
            else {
                res.json(req.restaurant);
            }
        });
    };

    var deleteRestaurant = function(req, res) {
        Restaurant.findById(req.params.id, function(err, restaurant) {
            req.book.remove(function(err) {
                if(err) {
                    // Server error
                    console.log(err);
                    res.status(500).send('Something bad happened!');
                }
                else {
                    res.status(204).send('Removed');
                }
            });
        });
    };

    return {
        post: post,
        getAll: getAll,
        put: put,
        patch: patch,
        delete: deleteRestaurant
    };
};

module.exports = restaurantController;