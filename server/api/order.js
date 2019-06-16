const router = require('express').Router()
const {Order, Product, CartProduct} = require('../db/models/')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    if (req.session.cartId) {
      const cart = await Order.findByPk(req.session.cartId)

      const products = await cart.getProducts()
      let cartQuantProducts = await products.map(async product => {
        const cartQuantItem = await CartProduct.findOne({
          where: {
            productId: product.id,
            orderId: req.session.cartId
          }
        })
        product.dataValues.cartQuantity = cartQuantItem.dataValues.cartQuantity

        return product
      })
      cartQuantProducts = await Promise.all(cartQuantProducts)
      cartQuantProducts = cartQuantProducts.filter(item => {
        return item.dataValues.cart_product.dataValues.cartQuantity !== 0
      })

      // console.log(productFromCart)
      // await CartProduct.update(
      //   {cartQuantity: cartQuantity + 1},
      //   {where: {orderId: req.session.cartId, productId: 1}}
      // )
      // console.log(productincart)
      // await productFromCart.update({
      //   cartQuantity: productFromCart.cartQuantity + 1
      // })
      // res.json(cartQuantProducts)
      res.json(cartQuantProducts)
    } else {
      res.json([])
    }
  } catch (err) {
    next(err)
  }
})

router.put('/add', async (req, res, next) => {
  try {
    const productFromCart = await CartProduct.findOrCreate({
      where: {orderId: req.session.cartId, productId: req.body.item.id}
    })

    // if (productFromCart) {
    await productFromCart[0].update({
      cartQuantity: +req.body.quantity + +productFromCart[0].cartQuantity
    })
    res.send('success!')
    // } else {
    //   const cart = await Order.findByPk(req.session.cartId)
    //   const item = await Product.findByPk(req.body.item.id)

    //   await cart.addProduct(item)
    //   const productFromCart2 = await CartProduct.findOne({
    //     where: {orderId: req.session.cartId, productId: req.body.item.id}
    //   })
    // await productFromCart2.update({
    //   cartQuantity: req.body.quantity
    // })
    // res.send('success!')
    // }
  } catch (err) {
    next(err)
  }
})

router.put('/edit', async (req, res, next) => {
  try {
    const productFromCart = await CartProduct.findOne({
      where: {orderId: req.session.cartId, productId: req.body.item.id}
    })
    // if (productFromCart) {
    await productFromCart.update({
      cartQuantity: +req.body.quantity
    })
    if (productFromCart.cartQuantity === 0) {
      productFromCart.destroy()
    }

    res.send('success!')
    // } else {
    //   const cart = await Order.findByPk(req.session.cartId)
    //   const item = await Product.findByPk(req.body.item.id)

    //   await cart.addProduct(item)
    //   const productFromCart2 = await CartProduct.findOne({
    //     where: {orderId: req.session.cartId, productId: req.body.item.id}
    //   })
    // await productFromCart2.update({
    //   cartQuantity: req.body.quantity
    // })
    // res.send('success!')
    // }
  } catch (err) {
    next(err)
  }
})
