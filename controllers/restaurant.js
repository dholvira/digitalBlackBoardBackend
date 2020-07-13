const mongoose = require('mongoose');

const Restaurants = require('../models/restaurants');

const config = require('config');
const fs = require('fs');

const restaurants = {};

restaurants.get = (req, res, next) => {
  Restaurants.find().then((data) => {
    if (data) {
      res.json({ data: data });
    } else {
      res.json({ error: 'No data found..' });
    }
  });
};

restaurants.add = (req, res, next) => {
  if (req.body) {
    const files = req.files;
    let op = [];
    if (files.length <= 0) {
      let record = new Restaurants();

      record.restaurantName = req.body.name;
      record.font = req.body.font;
      record.timeout = req.body.timeout;

      record
        .save()
        .then((data) => {
          res.json({ success: 'Info added without logo..' });
        })
        .catch((err) => {
          console.log(err, 'error adding restaurant info..');
          res.status(503).json({ err: 'Error adding Info..' });
        });
    } else {
      files.forEach((e) => {
        op = [...op, e.filename];
      });
      let record = new Restaurants();

      record.restaurantName = req.body.name;
      record.font = req.body.font;
      record.timeout = req.body.timeout;
      record.restaurantLogo = op[0];

      record
        .save()
        .then((data) => {
          res.json({ success: 'Info added..' });
        })
        .catch((err) => {
          console.log(err, 'error adding restaurant info..');
          res.status(503).json({ err: 'Error adding Info..' });
        });
    }
  } else {
    res.status(503).json({ err: 'Info addition Failed..' });
  }
};

restaurants.updateRestaurant = (req, res, next) => {
  function removeFiles(logo) {
    return new Promise((resolve, reject) => {
      const path = config.get('profile_directory');
      console.log(path, 'path');

      try {
        const f = path + logo;
        console.log(f);
        fs.unlinkSync(f);
        resolve(true);
      } catch (err) {
        console.error(err);
        resolve(false);
      }
    });
  }
  if (req.body) {
    const name = req.body.name;
    const font = req.body.font;
    const timeout = req.body.timeout;
    const files = req.files;
    let op = [];

    if (files.length <= 0) {
      // const error = new Error('Please choose files');
      // error.httpStatusCode = 400;
      // console.log('error not found files!!');
      // return res.send(error);
      Restaurants.findOne({ _id: req.params.id })
        .then(async (data) => {
          if (!data) {
            return res.status(422).json({ error: 'Error no data not found.' });
          }
          // const a = await removeFiles(data.restaurant);
          // console.log(op[0], 'op');
          // data.restaurantLogo = op[0];
          data.restaurantName = name;
          data.font = font;
          data.timeout = timeout;
          data.rest;
          data
            .save()
            .then((d) => res.json({ success: 'Details Updated..' }))
            .catch(next);
        })
        .catch((err) => {
          res.status(503).json({ err: err });
        });
    } else {
      files.forEach((e) => {
        // console.log(e.filename, 'filename');
        op = [...op, e.filename];
      });

      Restaurants.findOne({ _id: req.params.id })
        .then(async (data) => {
          if (!data) {
            return res.status(422).json({ error: 'Data not Found.' });
          }
          const a = await removeFiles(data.restaurant);
          console.log(op[0], 'op');
          data.restaurantLogo = op[0];
          data.restaurantName = name;
          data.font = font;
          data.timeout = timeout;
          data.rest;
          data
            .save()
            .then((d) => res.json({ success: 'Details Updated..' }))
            .catch(next);
        })
        .catch((err) => {
          res.status(503).json({ err: err });
        });
    }
  } else {
    res.status(503).json({ err: 'Error no data found..' });
  }
};

module.exports = restaurants;
