const router = require('express').Router()
const {User, Product} = require('../db/models/')
module.exports = router

router.get('/users', async (req, res, next) => {
  if (req.user.isAdmin) {
    let users = await User.findAll()
    res.json(users)
  } else res.sendStatus(401)
})

router.get('/users/:id', async (req, res, next) => {
  if (req.user.isAdmin) {
    let users = await User.findByPk(req.params.id)
    res.json(users)
  } else res.sendStatus(401)
})

router.put('/users/:id', async (req, res, next) => {
  if (req.user.isAdmin) {
    let email = req.body.email
    let isAdmin = req.body.isAdmin
    let user = await User.findByPk(+req.params.id)
    user.update({email, isAdmin})
  }
  res.sendStatus(201)
})

router.get('/products', async (req, res, next) => {
  if (req.user.isAdmin) {
    let products = await Product.findAll()
    res.json(products)
  } else res.sendStatus(401)
})

router.get('/products/:id', async (req, res, next) => {
  if (req.user.isAdmin) {
    let products = await Product.findByPk(req.params.id)
    res.json(products)
  } else res.sendStatus(401)
})
router.put('admin/products/:id', async (req, res, next) => {
  if (req.user.isAdmin) {
    let name = req.body.name
    let quantity = req.body.quantity
    let imageUrl = req.body.imageUrl
    let price = req.body.price
    let user = await User.findByPk(+req.params.id)
    user.update({name, quantity, imageUrl, price})
  }
})
