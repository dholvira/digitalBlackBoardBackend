const mongoose = require('mongoose');

const RestaurantSchema = new mongoose.Schema({
  restaurantName: {
    type: String,
    default: '',
  },
  restaurantLogo: {
    type: String,
    default: 'default.jpeg',
  },
  font: {
    type: String,
    default: 'Bradley Hand, cursive',
  },
  timeout: {
    type: Number,
    default: 2000,
  },
});

module.exports = mongoose.model('restaurant', RestaurantSchema);
