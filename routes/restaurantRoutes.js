var express = require('express');
var mongoose = require('mongoose');

var router = function(Restaurant) {
    var resRouter = express.Router();
    
    resRouter.route('/')
        .get(function(req, res) {
            var query = {};
            Restaurant.find(query, function(err, restaurants) {
                if(err) {
                    console.log(err);
                    res.status(500).send(err);
                }
                else {
                    res.json(restaurants);
                }
            });
        })
        .post(function(req, res) {
            var restaurant = new Restaurant(req.body);
            restaurant.save();
            restaurant.status(201);
            res.json(restaurant);
        });


    // find book and pass on if found
    resRouter.use('/:id', function(req, res, next) {
        // TODO: check for valid object ID
        Restaurant.findById(req.params.id ,function(err, restaurant) {
            if(err) {
                console.log(err);
                res.status(500).send(err);
            }
            else if(restaurant) {
                req.restaurant = restaurant;
                next();
            }
            else {
                req.status(404).send("Not found");
            }
        });
    });
    resRouter.route('/:id')
        .get(function(req, res) {
            res.json(req.restaurant);
        })
        .put(function(req, res) {
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
        })
        .patch(function(req, res) {
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
        })
        .delete(function(req, res) {
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
        });

        return resRouter;
};

module.exports = router;