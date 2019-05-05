const { Sequelize } = require('sequelize');

  // connection to the database
  const db = new Sequelize({
    database: 'restaurant_db',
    dialect: 'postgres'
  })

  // define models
  const Review = db.define('review', {
    description: {
      type: Sequelize.TEXT
    }
  })

  const Restaurant = db.define('restaurant', {
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    neighborhood: {
      type: Sequelize.STRING,
      defaultValue: 'Flatiron District',
      allowNull: false
    }
  })

  const Cuisine = db.define('cuisine', {
    style: {
      type: Sequelize.STRING
    }
  })

  // define relationships
  // 1:M
  Restaurant.hasMany(Review, {
    onDelete: 'cascade'
  });

  Review.belongsTo(Restaurant)

  // M:M
  Restaurant.belongsToMany(Cuisine, {
    through: 'restaurant_cuisine_xref',
    foreignKey: 'restaurantId'
  })

  Cuisine.belongsToMany(Restaurant, {
    through: 'restaurant_cuisine_xref',
    foreignKey: 'cuisineId'
  })

module.exports = {
  db,
  Restaurant,
  Review,
  Cuisine
}
