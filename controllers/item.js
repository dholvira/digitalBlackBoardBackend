const mongoose = require('mongoose');

const Items = require('../models/items');

const config = require('config');
const fs = require('fs');

const items = {};

items.get = (req, res, next) => {
  Items.find().then((data) => {
    if (data) {
      res.json({ data: data });
    } else {
      res.json({ error: 'Empty Set' });
    }
  });
};

items.add = (req, res, next) => {
  if (req.body) {
    // console.log(req.body);

    let record = new Items();
    record.name = req.body.name;
    record.price = req.body.price;
    record.desc = req.body.desc;

    record
      .save()
      .then((data) => {
        res.json({ success: 'item added' });
      })
      .catch((err) => {
        console.log(err);
        res.status(503).json({ err: err.errmsg });
      });
  } else {
    res.status(503).json({ err: 'Not data found.' });
  }
};
items.edit = (req, res, next) => {
  if (req.body) {
    const update = {
      name: req.body.name,
      price: req.body.price,
      desc: req.body.desc,
    };
    options = {
      upsert: false,
    };
    Items.updateOne({ _id: req.params.id }, { $set: update }, options)
      .then((data) => {
        res.json({ success: 'item edited' });
      })
      .catch((err) => {
        res.status(503).json({ err: err });
      });
  } else {
    res.status(503).json({ err: 'Not data found.' });
  }
};

items.delete = (req, res, next) => {
  const id = req.body.id;
  if (id) {
    Items.deleteOne({ _id: id })
      .then((data) => res.json({ success: 'item deleted' }))
      .catch((err) => {
        console.log(err);
        res.send(err);
      });
  } else {
    res.status(503).json({ err: 'Not data found.' });
  }
};

module.exports = items;
