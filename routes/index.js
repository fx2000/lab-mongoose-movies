const express = require('express');
const router  = express.Router();
const Celebrity = require('../models/Celebrity');

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

// Celebrities page
router.get('/celebrities', (req, res, next) => {
  Celebrity.find()
    .then(data => {
      console.log(data);
      res.render('celebrities', {
        data,
        title: 'Celebrities'
      });
    })
    .catch(error => {
      console.log('Error while getting the celebrities from the DB: ', error);
    })
});

module.exports = router;
