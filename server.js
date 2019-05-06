// importing express from our dependencies
const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser')
const logger = require('morgan');

// import routes
const { restaurantRouter } = require('./routes/restaurantRouter');
// const { reviewRouter } = require('./routes/reviewRouter');
// const { cuisineRouter } = require('./routes/cuisineRouter');

// import models
const { Restaurant, Review, Cuisine } = require('./models')

// establishing the I/O port
const PORT = process.env.PORT || 4567

// initializing the express app
const app = express();

app.use(logger('dev'))
app.use(cors())

// parse application/json
app.use(bodyParser.json())

app.use('/restaurants', restaurantRouter)

// Root route
app.get('/', async (request, response) => {
  try {
    response.send('Welcome to the Restaurant App')
  } catch (e) {
    response.status(e.status).json({ msg: e.status })
  }
});

app.listen(PORT, () => console.log(`Restaurant app listening on port ${PORT}!`))
