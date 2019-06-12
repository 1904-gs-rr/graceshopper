const router = require('express').Router()
const {Order, Product} = require('../db/models/')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    if (req.session.cartId) {
      const cart = await Order.findByPk(req.session.cartId)
      const products = await cart.getProducts()
      res.json(products)
    } else {
      res.json([])
    }
    // else res.json('local storage cart')
  } catch (err) {
    next(err)
  }
})

router.put('/', async (req, res, next) => {
  try {
    const cart = await Order.findByPk(req.session.cartId)
    const item = await Product.findByPk(req.body.id)
    // if cart has item, increase quantity, else:
    // if (cart.hasProduct(item)) {

    // }
    await cart.addProduct(item)
  } catch (err) {
    next(err)
  }
})
