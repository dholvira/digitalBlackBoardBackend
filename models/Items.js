const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
  name: {
    type: String,
    default: '',
  },
  price: {
    type: Number,
    default: '',
  },
  desc: {
    type: String,
    default: '',
  },
});

module.exports = mongoose.model('item', ItemSchema);
