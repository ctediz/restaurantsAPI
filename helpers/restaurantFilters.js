module.exports = {
    filter: function(req) {
        var restaurant = require('../models/restaurantModel');
        var query = {};

        for(var p in req.query) {
            // Verify parameter against schema
            if(restaurant.schema.path(p)) {
                query[p] = req.query[p];
            }
        }
        return query;
    }
};