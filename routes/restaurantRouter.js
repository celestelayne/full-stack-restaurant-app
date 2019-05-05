const { Router } = require('express');
const restaurantRouter = Router();

// GET all
restaurantRouter.get('/restaurants', async (request, response) => {
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
restaurantRouter.get('/restaurants/:id', async (request, response) => {
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

restaurantRouter.post('/restaurants', async (request, response) => {
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

restaurantRouter.put('/restaurants/:id', async (request, response) => {
  try {
    const id = request.params.id;
    const restaurant = await Restaurant.findByPk(id);

    if (restaurant) await restaurant.update(request.body);
    response.json({
      restaurant
    });
  } catch(e) {
    response.json({
      message: e.message
    });
  }
})

// DELETE one
restaurantRouter.delete('/restaurants/:id', async (request, response) => {
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
