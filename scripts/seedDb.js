const { Restaurant, Review, Cuisine } = require('../models.js')
const { restaurant, review, cuisine } = require('../data.js')

async function main() {

    // delete everything in the database

    await Restaurant.destroy({
      where: {}
    });

    await Review.destroy({
      where: {}
    });

    await Cuisine.destroy({
      where: {}
    });

    // add seed data instances

    const motorino = await Restaurant.create({
      name: 'Motorino',
      neighborhood: 'East Village'
    })

    const momofuku = await Restaurant.create({
      name: 'Momofuku Noodle Bar',
      neighborhood: 'East Village'
    })

    const mission = await Restaurant.create({
      name: 'Mission Chinese Food',
      neighborhood: 'Lower East Side'
    })

    const eisenberg = await Restaurant.create({
      name: 'Eisenberg Sandwich Shop',
      neighborhood: 'Flatiron District'
    })

    const shake = await Restaurant.create({
      name: 'Shake Shack',
      neighborhood: 'Flatiron District'
    })

    const review01 = await Review.create({
      description: "The service wasn't great, but oh my, the pizza was arguably THE BEST we have ever had in NYC."
    })

    const review02 = await Review.create({
      description: "It's not pretty, but the experience is truly old New York greatness."
    })

    const review03 = await Review.create({
      description: "This place is good but not amazing."
    })

    const review04 = await Review.create({
      description: "We ordered the pork belly buns as an appetizer. Yummy for sure--the pork belly was appropriately tender."
    })

    const review05 = await Review.create({
      description: "The burger was EVERYTHING! It was seriously one of the best hamburgers I have ever had."
    })

    const sandwich = await Cuisine.create({
      style: "Sandwich"
    })

    const pizza = await Cuisine.create({
      style: "Pizza"
    })

    const chinese = await Cuisine.create({
      style: "Chinese"
    })

    const american = await Cuisine.create({
      style: "American"
    })

    const ramen = await Cuisine.create({
      style: "Ramen"
    })

    // associations

    await review01.setRestaurant(motorino)
    await review04.setRestaurant(momofuku)
    await review03.setRestaurant(mission)
    await review02.setRestaurant(eisenberg)
    await review05.setRestaurant(shake)

    await motorino.addCuisine(pizza)
    await momofuku.addCuisine(ramen)
    await mission.addCuisine(chinese)
    await eisenberg.addCuisine(sandwich)
    await shake.addCuisine(sandwich)
    await shake.addCuisine(american)

}


async function run() {
  try {
    await main();
  } catch (e) {
    console.error(e);
  } finally {
    await process.exit()
  }
}

run();

