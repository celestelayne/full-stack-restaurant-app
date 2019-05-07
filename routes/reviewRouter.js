const { Router } = require('express');
const { Restaurant, Review } = require('../models');
const reviewRouter = Router();

reviewRouter.use((err, req, res, next) => {
  try {
    console.log('I\'m a Review Router middleware.');
  } catch(err) {
    console.log(err.message)
  } finally {
    next(err);
  }
})

reviewRouter.get('/', async (request, response) => {
  try {
    const reviews = await Review.findAll({
      include: [ Restaurant ]
    });
    response.json({
      reviews
    })
  } catch (e) {
    response.status(500).json({ msg: e.message })
  }
})

module.exports = {
  reviewRouter
}
