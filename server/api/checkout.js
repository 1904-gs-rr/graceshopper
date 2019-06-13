const router = require('express').Router()
const {Order, Product, CartProduct, User} = require('../db/models/')
module.exports = router

router.put('/', async (req, res, next) => {
  try {
    console.log('____', req.session.cartId)
    await Order.update({status: true}, {where: {id: req.session.cartId}})
    const productsFromCart = await CartProduct.findAll({
      where: {orderId: req.session.cartId}
    })
    productsFromCart.map(async product => {
      const productInstance = await Product.findByPk(product.productId)
      await productInstance.update({
        quantity: productInstance.quantity - product.cartQuantity
      })
    })
    const user = await User.findByPk(req.session.userId)
    const newOrder = await Order.create({})
    user.addOrder(newOrder)
    req.session.cartId = newOrder.id
    console.log(req.session.cartId)
    res.send(productsFromCart)
  } catch (error) {
    next(error)
  }
})