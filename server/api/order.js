const router = require('express').Router()
const {Order, Product, CartProduct} = require('../db/models/')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    if (req.session.cartId) {
      const cart = await Order.findByPk(req.session.cartId)

      const products = await cart.getProducts()

      // console.log(productFromCart)
      // await CartProduct.update(
      //   {cartQuantity: cartQuantity + 1},
      //   {where: {orderId: req.session.cartId, productId: 1}}
      // )
      // console.log(productincart)
      // await productFromCart.update({
      //   cartQuantity: productFromCart.cartQuantity + 1
      // })
      res.json(products)
    } else {
      res.json([])
    }
  } catch (err) {
    next(err)
  }
})

router.put('/', async (req, res, next) => {
  try {
    const productFromCart = await CartProduct.findOne({
      where: {orderId: req.session.cartId, productId: req.body.id}
    })
    console.log(productFromCart)
    if (productFromCart) {
      await productFromCart.update({
        cartQuantity: productFromCart.cartQuantity + 1
      })
      res.send('success!')
    } else {
      const cart = await Order.findByPk(req.session.cartId)
      const item = await Product.findByPk(req.body.id)

      await cart.addProduct(item)
      res.send('success!')
    }
  } catch (err) {
    next(err)
  }
})
