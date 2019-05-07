/**************************
 * SERVER-SIDE JAVASCRIPT *
 **************************/

// require express in app
const express = require('express');
// get parameters from POST requests
const bodyParser = require('body-parser')
// cross origin
const cors = require('cors')
// log to the terminal
const logger = require('morgan');

// import routes
const { restaurantRouter } = require('./routes/restaurantRouter');
const { reviewRouter } = require('./routes/reviewRouter');
// const { cuisineRouter } = require('./routes/cuisineRouter');

// import models
const { Restaurant, Review, Cuisine } = require('./models')

// establishing the I/O port
const PORT = process.env.PORT || 4567

// initializing the express app
const app = express();

/**************
 * MIDDLEWARE *
 **************/

app.use(logger('dev'))
app.use(cors())

// parse application/json
app.use(bodyParser.json())

app.use('/restaurants', restaurantRouter)
app.use('/reviews', reviewRouter)

/**********
 * ROUTES *
 **********/

app.get('/', async (request, response) => {
  try {
    response.send('Welcome to the Jeopardy Restaurant App')
  } catch (e) {
    response.status(e.status).json({ msg: e.status })
  }
});

/**********
 * SERVER *
 **********/

app.listen(PORT, () => console.log(`Restaurant app listening on port ${PORT}!`))
