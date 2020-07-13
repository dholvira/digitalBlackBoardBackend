const restaurant = require('express').Router();
const restaurantController = require('../controllers/restaurant');

const config = require('config');
const path = require('path');

const multer = require('multer');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, config.get('profile_directory'));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname.replace(/\s/g, '_'));
  },
});

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    console.log(ext, 'llllllllllll');
    if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
      return cb(new Error('Only images are allowed'));
    }
    cb(null, true);
  },
});
restaurant.post('/add', upload.array('file', 12), restaurantController.add);

restaurant.get('/get', restaurantController.get);

restaurant.post(
  '/edit/:id',
  upload.array('file', 12),
  restaurantController.updateRestaurant
);

module.exports = restaurant;
