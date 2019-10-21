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
});

// Delete Celebrity POST
router.post('/celebrities/:id/delete', (req, res, next) => {
  const {id} = req.params;
  Celebrity.findByIdAndRemove(id)
  .then(data => {
    res.redirect('/celebrities/index')
  })
  .catch(error => {
    console.log(error);
    res.redirect('/celebrities/index')
  })
});

// Celebrity Details page
router.get('/celebrities/:id', (req, res, next) =>{
  const {id} = req.params;
  Celebrity.findById(id)
    .then(data => {res.render('celebrities/show', {data})})
    .catch(error => {console.log('Error finding celebrity', error)})
});

// Edit Celebrity GET
router.get('/celebrities/:id/edit', (req, res, next) =>{
  const {id} = req.params;
  Celebrity.findById(id)
    .then(data => {res.render('celebrities/edit', {data})})
    .catch(error => {console.log('Error finding celebrity', error)})
});

// Edit Celebrity POST
router.post('/celebrities/:id', (req, res, next) => {
  const {id} = req.params;
  const {name, occupation, catchPhrase} = req.body;
  Celebrity.findOneAndUpdate(
    {_id: id},
    {$set: {name, occupation, catchPhrase}},
    {new: true})
    .then(data => {
      res.redirect('/celebrities/index');
    })
    .catch(error => {
      console.log(error);
      res.redirect('/celebrities/' + id + '/edit');
    })
});




module.exports = router;
