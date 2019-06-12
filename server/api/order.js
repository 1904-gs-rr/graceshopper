const router = require('express').Router()
const {Order, Product} = require('../db/models/')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    if (req.session.cartId) {
      const cart = await Order.findByPk(req.session.cartId)
      const products = await cart.getProducts()
      res.json(products)
    }
    // else res.json('local storage cart')
  } catch (err) {
    next(err)
  }
})

router.put('/', async (req, res, next) => {
  try {
    console.log(req.session)
    const cart = await Order.findByPk(req.session.cartId)
    const item = await Product.findByPk(req.body.id)
    await cart.addProduct(item)
    res.send('success!')
  } catch (err) {
    next(err)
  }
})
