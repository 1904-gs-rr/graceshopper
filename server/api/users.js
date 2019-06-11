const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router

/*GET SINGLE USER BY ID*/

router.get('/:id', async (req, res, next) => {
  try {
    const {data} = await User.findById(req.params.id)
    if (!user) {
      res.status(404).send()
    } else {
      res.json(data)
    }
  } catch (error) {
    next(error)
  }
})
