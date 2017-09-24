var express = require('express');

var router = function(Restaurant) {
    var resRouter = express.Router();
    var restaurantController = require('../controllers/restaurantController')(Restaurant);
    
    resRouter.route('/')
        .get(restaurantController.getAll)
        .post(restaurantController.post);

    // find book and pass on if found
    resRouter.use('/:id', function(req, res, next) {
        var mongoose = require('mongoose');
        if(mongoose.Types.ObjectId.isValid(req.params.id)) {
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
        }
        else {
            res.status(404).send('Malformed ID');
        }
    });
    resRouter.route('/:id')
        .get(function(req, res) {
            res.json(req.restaurant);
        })
        .put(restaurantController.put)
        .patch(restaurantController.patch)
        .delete(restaurantController.delete);

        return resRouter;
};

module.exports = router;