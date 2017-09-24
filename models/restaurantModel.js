var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var restaurantModel = new Schema({
    url: {
        type: String
    },
    address: {
        type: String
    },
    city: {
        type: String
    },
    type: {
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