const express   = require('express');
const router    = express.Router();
const Celebrity = require('../models/Celebrity');

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

// Celebrities page
router.get('/celebrities/index', (req, res, next) => {
  Celebrity.find()
    .then(data => {res.render('celebrities', {data})})
    .catch(error => {console.log('Error while getting the celebrities from the DB: ', error)})
});

// New Celebrity GET
router.get('/celebrities/new', (req, res, next) => {
  res.render('celebrities/new');
});

// New Celebrity POST
router.post('/celebrities', (req, res, next) => {
  const {name, occupation, catchPhrase} = req.body;
  const newCelebrity = new Celebrity({name, occupation, catchPhrase});

  newCelebrity.save()
    .then(data => {
      res.redirect('/celebrities/index');
    })
    .catch(error => {
      console.log(error);
      res.redirect('/celebrities/new');
    })
})

// Celebrity Details page
router.get('/celebrities/:id', (req, res, next) =>{
  let {id} = req.params;
  Celebrity.findById(id)
    .then(data => {res.render('celebrities/show', {data})})
    .catch(error => {console.log('Error finding celebrity', error)})
})

module.exports = router;
