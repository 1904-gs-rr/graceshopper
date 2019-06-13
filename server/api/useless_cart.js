const router = require('express').Router()
const {User, Cart, Product} = require('../db/models/')
module.exports = router

// router.get('/', async (req, res, next) => {
//   console.log('in_Cartttt________')
//   try {
//     if (req.session.cartId) {
//       const cart = await Cart.findByPk(req.session.cartId)
//       const products = await cart.getProducts()
//       console.log(products, '___________')
//       res.json(products)
//     }
//   } catch (err) {
//     next(err)
//   }
// })

router.put('/', async (req, res, next) => {
  try {
    const cart = await Cart.findByPk(req.session.cartId)
    const item = await Product.findByPk(req.body.id)
    await cart.addProduct(item)
    res.send('success!')
  } catch (err) {
    next(err)
  }
})
