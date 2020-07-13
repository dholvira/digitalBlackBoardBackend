const mongoose = require('mongoose');

const Carousels = require('../models/carousels');

const config = require('config');
const fs = require('fs');

const carousels = {};

carousels.get = (req, res, next) => {
  Carousels.find().then((data) => {
    if (data) {
      res.json({ data: data });
    } else {
      res.json({ error: 'Empty Set' });
    }
  });
};

carousels.add = (req, res, next) => {
  if (req.body) {
    // console.log(req.body);

    let record = new Carousels();
    record.altText = req.body.altText || '';
    record.caption = req.body.caption;
    console.log(req.file, req.files, 'filess');
    const files = req.files;
    let op = [];

    if (!files) {
      const error = new Error('Please choose files');
      error.httpStatusCode = 400;
      return res.send(error);
    }
    files.forEach((e) => {
      console.log(e.filename, 'filename');
      op = [...op, e.filename];
    });
    record.src = op[0];
    record
      .save()
      .then((udata) => {
        res.json({ data: udata });
      })
      .catch((err) => {
        console.log(err);
        res.status(503).json({ err: err.errmsg });
      });
  } else {
    res.status(503).json({ err: 'Not data found.' });
  }
};

carousels.edit = (req, res, next) => {
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
    console.log(req.params, 'dfdfdd');
    const altText = req.body.altText;
    const caption = req.body.caption;
    const files = req.files;
    let op = [];

    if (files.length <= 0) {
      // const error = new Error('Please choose files');
      // error.httpStatusCode = 400;
      // return res.send(error);
      Carousels.findOne({ _id: req.params.id })
        .then(async (data) => {
          if (!data) {
            return res.status(422).json({ error: 'Data not Found.' });
          }
          data.altText = altText;
          data.caption = caption;
          data.rest;
          data
            .save()
            .then((d) => res.json({ success: 'Carousel edited.. ' }))
            .catch(next);
        })
        .catch((err) => {
          res.status(503).json({ err: err });
        });
    } else {
      files.forEach((e) => {
        console.log(e.filename, 'filename');
        op = [...op, e.filename];
      });

      Carousels.findOne({ _id: req.params.id })
        .then(async (data) => {
          if (!data) {
            return res.status(422).json({ error: 'Data not Found.' });
          }
          const a = await removeFiles(data.src);
          console.log(op[0], 'op');
          data.src = op[0];
          data.altText = altText;
          data.caption = caption;
          data.rest;
          data
            .save()
            .then((d) => res.json({ success: 'Carousel Edited..' }))
            .catch(next);
        })
        .catch((err) => {
          res.status(503).json({ err: err });
        });
    }
  } else {
    res.status(503).json({ err: 'Not data found.' });
  }
};

carousels.delete = (req, res, next) => {
  console.log(req.body);
  const id = req.body.id;
  function removeFiles(image) {
    return new Promise((resolve, reject) => {
      const path = config.get('profile_directory');

      try {
        const f = path + image;
        console.log(f);
        fs.unlinkSync(f);
        resolve(true);
      } catch (err) {
        console.error(err);
        resolve(false);
      }
    });
  }
  Carousels.findOne({ _id: id })
    .then(async (data) => {
      const a = await removeFiles(data.src);
      data.delete().then((d) => res.json({ success: 'Carousel Deleted..!!' }));
    })
    .catch((err) => {
      console.log(err);
      res.send(err);
    });
};

module.exports = carousels;
