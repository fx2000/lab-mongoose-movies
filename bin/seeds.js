const mongoose = require('mongoose');
const Celebrity = require('../models/Celebrity');

const dbtitle = "lab-mongoose-movies";
mongoose.connect(`mongodb://localhost/${dbtitle}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const celebrities = [
  {
    name: 'Arnold Schwarzenegger',
    occupation: 'Actor',
    catchPhrase: "I'll be back"
  },
  {
    name: 'Tom Cruise',
    occupation: 'Actor',
    catchPhrase: "You don't know the history of psychiatry like I do"
  },
  {
    name: 'Jennifer Lawrence',
    occupation: 'Actress',
    catchPhrase: 'I volunteer as tribute'
  }
]

// Add new celebrities from seed to database
const createCelebrities = celebrities.map(celebrity => {
  const newCelebrity = new Celebrity(celebrity)
  return newCelebrity.save()
    .then(celebrity => {
      console.log('Celebrity created correctly: ', celebrity);
      mongoose.connection.close();
    })
    .catch(error => {
      throw new Error(`Impossible to add the celebrity. ${error}`);
      mongoose.connection.close();
    })
})