var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var restaurantModel = new Schema({
    URL: {
        type: String
    },
    name: {
        type: String
    },
    address: {
        type: String
    },
    city: {
        type: String
    },
    type_of_food: {
        type: String
    },
    outcode: {
        type: String
    },
    postcode: {
        type: String
    },
    rating: {
        type: Number
    }
});

module.exports = mongoose.model('Restaurant', restaurantModel, "restaurant");