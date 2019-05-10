const express = require('express');
const { Restaurant, Review } = require('../models');
const restaurantRouter = express.Router();

// middleware that is specific to this router
restaurantRouter.use((err, req, res, next) => {
  try {
    console.log('i\'m a Restaurant Router middleware.');
    console.log('Time: ', Date.now())
  } catch(err) {
    console.log(err.message)
  } finally {
    next(err);
  }
})

// define the root route
// GET -- localhost:PORT/restaurants
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

// GET -- localhost:PORT/restaurants/1
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

// CREATE -- localhost:PORT/restaurants

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

// UPDATE -- localhost:PORT/restaurants/1

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

// DELETE -- localhost:PORT/restaurants/1
restaurantRouter.delete('/:id', async (request, response) => {
  try {
    const id = request.params.id
    console.log(id)

    // const restaurant = await Restaurant.findByPk(id)

    await Restaurant.destroy({
      where: {
        id: id
      }
    })

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
