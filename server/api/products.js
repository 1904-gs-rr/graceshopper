const router = require('express').Router()
const Product = require('../db/models/product')

module.exports = router

/**GET ALL PRODUCTS**/

router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll()
    res.status(200).json(products)
  } catch (error) {
    next(error)
  }
})

/**GET SINGLE PRODUCT**/

router.get('/:id', async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id)
    res.status(200).json(product)
  } catch (error) {
    next(error)
  }
})
