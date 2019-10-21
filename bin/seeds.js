const mongoose  = require('mongoose');
const Celebrity = require('../models/Celebrity');
const Movie     = require('../models/Movie');

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
];

const movies = [
  {
    title: 'Bad Boys',
    genre: 'Action',
    plot: 'Two hip detectives protect a witness to a murder while investigating a case of stolen heroin from the evidence storage room from their police precinct.'
  },
  {
    title: 'The Hunger Games',
    genre: 'Adventure',
    plot: "Katniss Everdeen voluntarily takes her younger sister's place in the Hunger Games: a televised competition in which two teenagers from each of the twelve Districts of Panem are chosen at random to fight to the death."
  },
  {
    title: 'The Terminator',
    genre: 'Action',
    plot: "A seemingly indestructible robot is sent from 2029 to 1984 to assassinate a young waitress, whose unborn son will lead humanity in a war against sentient machines, while a human soldier from the same war is sent to protect her at all costs."
  }
];

// Add new celebrities from seed to database
const createCelebrities = (celebrities) => {
  celebrities.map(celebrity => {
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
};

// Add new movies from seed to database
const createMovies = (movies) => {
  movies.map(movie => {
    const newMovie = new Movie(movie)
    return newMovie.save()
      .then(movie => {
        console.log('Movie created correctly: ', movie);
        mongoose.connection.close();
      })
      .catch(error => {
        throw new Error(`Impossible to add the movie. ${error}`);
        mongoose.connection.close();
      })
  })
};

// Call createCelebrities function
//createCelebrities(celebrities);

// Call createMovies function
createMovies(movies);