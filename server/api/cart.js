const router = require('express').Router()
const {User, Cart} = require('../db/models/')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    if (req.session.cartId) {
      const cart = await Cart.findByPk(req.session.cartId)
      const products = await cart.getProducts()
      res.json(products)
    }
    // else res.json('local storage cart')
  } catch (err) {
    next(err)
  }
})
