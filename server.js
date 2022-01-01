const express = require('express') 
const app = express(); //starter code to use express | We assign express() to the app variable so that we can later chain on methods to the Express.js server.

app.get('/api/animals', (req, res) => { // get() method requires two arguments. The first is a string that describes the route the client will have to fetch from. The second is a callback function that will execute every time that route is accessed with a GET request.
  res.json(animals); //we are using the send() method from the res parameter (short for response) to send the string Hello! to our client. - this was changed in the next step of module |
});
app.listen(3001, () => {
  console.log(`API server now on port 3001!`); //the port is to classroom/building like a web address is to the copllege campus
});

const {animals} = require('./data/animals.json'); //path in ''

//stop previous server with ctrl+c, to run again

