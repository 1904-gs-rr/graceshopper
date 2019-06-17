const router = require('express').Router()
const {User, Product} = require('../db/models/')
module.exports = router

router.get('/users', async (req, res, next) => {
  if (req.user.isAdmin) {
    let users = await User.findAll()
    res.json(users)
  } else res.sendStatus(401)
})

router.put('/admin/users/:id', async (req, res, next) => {
  if (req.user.isAdmin) {
    let name = req.body.name
    let email = req.body.email
    let imageUrl = req.body.imageUrl
    let isAdmin = req.body.isAdmin
    let user = await User.findByPk(+req.params.id)
    user.update({name, email, imageUrl, isAdmin})
  }
  res.sendStatus(201)
})

router.get('/admin/products', async (req, res, next) => {
  if (req.user.isAdmin) {
    let products = await Product.findAll()
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