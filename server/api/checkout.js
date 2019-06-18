const router = require('express').Router()
const {Order, Product, CartProduct, User} = require('../db/models/')
module.exports = router

router.put('/', async (req, res, next) => {
  try {
    await Order.update({status: true}, {where: {id: req.session.cartId}})
    const user = await User.findByPk(req.user.id)
    const newOrder = await Order.create({})
    user.addOrder(newOrder)
    req.session.cartId = newOrder.id
    res.send('success!')
  } catch (error) {
    next(error)
  }
})
