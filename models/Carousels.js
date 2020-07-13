const mongoose = require('mongoose');

const CarouselSchema = new mongoose.Schema({
  src: {
    type: String,
    default: '',
  },
  altText: {
    type: String,
    default: '',
  },
  caption: {
    type: String,
    default: '',
  },
});

module.exports = mongoose.model('carousel', CarouselSchema);
