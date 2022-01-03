const express = require('express') 
const PORT = process.env.PORT || 3001; //allows the port # to automatically set to the best option | Heroku requires 80 and this will allow it to be set to 80 rather than 3001 exclusively
const app = express(); //starter code to use express | We assign express() to the app variable so that we can later chain on methods to the Express.js server.

function filterByQuery(query, animalsArray) {
  let personalityTraitsArray = [];
  //Note that we save the animalsArray as filteredResults here:
  let filteredResults = animalsArray;
  if (query.personalityTraits) {
    //Save personalityTraits as a dedicated array.
    //If personalityTraits is a string, place it into a new array and save.
    if (typeof query.personalityTraits === 'string') {
      personalityTraitsArray = [query.personalityTraits];
    } else {
      personalityTraitsArray = query.personalityTraits;
    }
    //loop through each trait in the personalityTraits array:
    personalityTraitsArray.forEach(trait => {
       // Check the trait against each animal in the filteredResults array.
      // Remember, it is initially a copy of the animalsArray,
      // but here we're updating it for each trait in the .forEach() loop.
      // For each trait being targeted by the filter, the filteredResults
      // array will then contain only the entries that contain the trait,
      // so at the end we'll have an array of animals that have every one 
      // of the traits when the .forEach() loop is finished.
      filteredResults = filteredResults.filter(
        animals => animals.personalityTraits.indexOf(trait) !== -1
      );
    });
  }
  if (query.diet) {
    filteredResults = filteredResults.filter(animal => animal.diet === query.diet);
  }
  if (query.species) {
    filteredResults = filteredResults.filter(animal => animal.species === query.species);
  }
  if (query.name) {
    filteredResults = filteredResults.filter(animal => animal.name === query.name);
  }
  // return the filtered results:
  return filteredResults;
}

function findById(id, animalsArray) {
  const result = animalsArray.filter(animal => animal.id === id)[0];
  return result;
}

app.get('/api/animals', (req, res) => { // get() method requires two arguments. The first is a string that describes the route the client will have to fetch from. The second is a callback function that will execute every time that route is accessed with a GET request.
  let results = animals;
  if (req.query) {
    results = filterByQuery(req.query, results);
  }
  res.json(results); //we are using the send() method from the res parameter (short for response) to send the string Hello! to our client. - this was changed in the next step of module |
});

app.get('/api/animals/:id', (req, res) => {
  const result = findById(req.params.id, animals); //param always follows a get route
  if (result) {
    res.json(result);
  } else {
    res.send(404); //results in a 404 error if the parameter does not exist
  }
});


app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`); //the port is to classroom/building like a web address is to the copllege campus
});

const {animals} = require('./data/animals.json'); //path in ''

//stop previous server with ctrl+c, to run again

