const express = require('express');
const { Restaurant, Review } = require('../models');
const restaurantRouter = express.Router();

restaurantRouter.use((err, req, res, next) => {
  try {
    console.log('i\'m a Restaurant Router middleware.');
  } catch(err) {
    console.log(err.message)
  } finally {
    next(err);
  }
})

// GET all
restaurantRouter.get('/', async (request, response) => {
  try {
    const restaurants = await Restaurant.findAll({
      include: [ Review ]
    });
    response.json({
      restaurants
    })
  } catch (e) {
    response.status(500).json({ msg: e.message })
  }
})

// GET one
restaurantRouter.get('/:id', async (request, response) => {
  try {
    const id = request.params.id;
    const restaurant = await Restaurant.findByPk(id)

    if (!restaurant) throw Error('Restaurant not found');

    response.json({
      restaurant
    })
  } catch (e) {
    response.status(404).json({ msg: e.message })
  }
})

// CREATE one

restaurantRouter.post('/', async (request, response) => {
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

restaurantRouter.put('/:id', async (request, response) => {
  try {
    const id = request.params.id;
    const restaurant = await Restaurant.findByPk(id);

    if (restaurant) await restaurant.update(request.body);
    response.json({
      restaurant
    });
  } catch(e) {
    response.status(304).json({
      message: e.message
    });
  }
})

// DELETE one
restaurantRouter.delete('/:id', async (request, response) => {
  try {
    const id = request.params.id
    console.log(id)

    const restaurant = await Restaurant.findByPk(id)

    if(restaurant) await restaurant.destroy()

    response.json({
      message: `Restaurant with id ${id} deleted`
    })
  } catch (e) {
    response.json({ msg: e.message })
  }
});

module.exports = {
  restaurantRouter
}
