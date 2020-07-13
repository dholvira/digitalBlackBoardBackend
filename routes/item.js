const item = require('express').Router();

const itemController = require('../controllers/item');
item.get('/get', itemController.get);

item.post('/edit/:id', itemController.edit);

item.post('/add', itemController.add);

item.post('/remove', itemController.delete);

module.exports = item;
