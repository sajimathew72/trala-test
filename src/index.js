const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const {calculateRoundScore} = require('./hotshot_algo');
const util = require('node:util');
// defining the Express app
const app = express();

app.use(helmet());

// using bodyParser to parse JSON bodies into JS objects
app.use(bodyParser.json());

// enabling CORS for all requests
app.use(cors());

// adding morgan to log HTTP requests
app.use(morgan('combined'));


app.post('/hotshot/score', function (request, response){
  const drafted = request.body;

  try{
    finalScore = calculateRoundScore(drafted)
    response.send(util.format("scorecard = %s",finalScore));
  }catch(e){
    response.status(400);
    response.send("Error:"+e.message);
  }
});

app.listen(7070, function () {
console.log("Started application on port %d", 7070)
});
