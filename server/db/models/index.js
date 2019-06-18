const User = require('./user')
const Product = require('./product')
const Order = require('./order')
const db = require('../db')
const Sequelize = require('sequelize')

User.hasMany(Order)
Order.belongsTo(User)
const CartProduct = db.define('cart_product', {
  cartQuantity: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  }
})

Order.belongsToMany(Product, {through: CartProduct})
Product.belongsToMany(Order, {through: CartProduct})
/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */

module.exports = {
  CartProduct,
  User,
  Product,
  Order
}
