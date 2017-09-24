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
        });

        return resRouter;
};

module.exports = router;