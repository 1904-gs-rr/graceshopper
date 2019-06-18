const router = require('express').Router()
const {Order, Product, CartProduct} = require('../db/models/')
module.exports = router

router.get('/', async (req, res, next) => {
  if (req.user.googleId) {
    let cartId = await Order.max('id')
    req.session.cartId = cartId
    console.log(req.session)
  }

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

router.get('/history', async (req, res, next) => {
  try {
    const orders = await Order.findAll({
      where: {userId: req.user.id, status: true}
    })

    res.send(orders)
    // res.send(submittedOrders)
  } catch (error) {
    next(error)
  }
})

router.get('/history/:orderId', async (req, res, next) => {
  try {
    const orderDetails = await CartProduct.findAll({
      where: {orderId: req.params.orderId}
    })
    const products = await Promise.all(
      orderDetails.map(order => Product.findByPk(order.productId))
    )
    res.send(products)
    // res.send(submittedOrders)
  } catch (error) {
    next(error)
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
    const product = await Product.findOne({
      where: {
        id: productFromCart[0].productId
      }
    })

    const newQuant = +product.quantity - +req.body.quantity
    product.update({quantity: newQuant})
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
    const oldCartQuantity = productFromCart.cartQuantity
    // if (productFromCart) {
    await productFromCart.update({
      cartQuantity: +req.body.quantity
    })

    const product = await Product.findOne({
      where: {
        id: +productFromCart.productId
      }
    })
    let diff = +oldCartQuantity - +productFromCart.cartQuantity
    let newQuant = product.quantity + diff
    product.update({quantity: +newQuant})

    if (productFromCart.cartQuantity === 0) {
      await productFromCart.destroy()
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

router.put('/transferGuestCart', async (req, res, next) => {
  try {
    console.log('BODYBODY:', req.body)
    await req.body.forEach(async item => {
      const cartItem = await CartProduct.findOne({
        where: {
          orderId: req.session.cartId,
          productId: item.id
        }
      })
      if (cartItem) {
        let addedQuant = item.cartQuantity + cartItem.cartQuantity
        cartItem.update({cartQuantity: addedQuant})
      } else {
        await CartProduct.create({
          cartQuantity: item.cartQuantity,
          orderId: req.session.cartId,
          productId: item.id
        })
      }
    })
    // })
    // const product = await Product.findByPk(item.id)
    // const newQuant = product.dataValues.quantity - +item.cartQuantity
    // product.update({quantity: newQuant})
    res.send('success!')
  } catch (err) {
    next(err)
  }
})

router.put('/addGuest', async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.body.prod.id)
    const newQuant = product.quantity - req.body.value
    product.update({quantity: newQuant})
  } catch (err) {
    next(err)
  }
})

router.put('/guestEdit', async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.body.prod.id)
    const diff = req.body.prod.cartQuantity - req.body.value
    const newQuant = product.quantity + diff
    product.update({quantity: newQuant})
  } catch (err) {
    next(err)
  }
})
