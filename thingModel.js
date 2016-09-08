var mongoose = require('mongoose');

var thingModel = new mongoose.Schema({
    thing: String
});

module.exports = mongoose.model('Thing', thingModel);
