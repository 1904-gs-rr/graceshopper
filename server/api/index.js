const router = require('express').Router()
module.exports = router

router.use('/users', require('./users'))
router.use('/products', require('./products'))
router.use('/cart', require('./order'))
router.use('/checkout', require('./checkout'))
router.use('/users', require('./admin'))
router.use('/admin/products', require('./admin'))
router.use('/admin/users/:id', require('./admin'))
router.use('/admin/products/:id', require('./admin'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
