// importing express from our dependencies
const express = require('express');

const bodyParser = require('body-parser')

// initializing the express app
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// import models
const { Restaurant, Review, Cuisine } = require('./models')

// establishing the I/O port
const PORT = process.env.PORT || 3000

// Root route
app.get('/', async (request, response) => {
  try {
    response.send('Welcome to the Restaurant App')
  } catch (e) {
    response.status(e.status).json({ msg: e.status })
  }
});

// GET all
app.get('/restaurants', async (request, response) => {
  try {
    const restaurants = await Restaurant.findAll();
    response.json({
      restaurants
    })
  } catch (e) {
    response.status(500).json({ msg: e.message })
  }
})

// GET one
app.get('/restaurants/:id', async (request, response) => {
  try {
    const id = request.params.id;
    const restaurant = await Restaurant.findByPk(id)

    if (!restaurant) throw Error('Restaurant not found');

    response.json({
      restaurant
    })
  } catch (e) {
    response.status(500).json({ msg: e.message })
  }
})

// CREATE one

app.post('/restaurants', async (request, response) => {
  try {
    const restaurant = await Restaurant.create(request.body)
    response.json({
      restaurant
    })
  } catch (e) {
    response.status(500).json({ msg: e.message })
  }
})

// UPDATE one

// Coming Soon :-)

// DELETE one
app.delete('/restaurants/:id', async (req, res) => {
  try {
    const id = req.params.id
    console.log(id)

    const restaurant = await Restaurant.findByPk(id)

    if(restaurant) await restaurant.destroy()

    res.json({
      message: `Restaurant with id ${id} deleted`
    })
  } catch (e) {
    res.json({ msg: e.message })
  }
});


app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))
