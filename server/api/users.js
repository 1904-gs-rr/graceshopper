const router = require('express').Router()
const {User, Order} = require('../db/models/')
module.exports = router

/*GET SINGLE USER BY ID*/
router.get('/:id', async (req, res, next) => {
  try {
    if (req.session.userId === req.params.id) {
      const user = await User.findOne({
        where: {
          id: req.params.id
        }
      })
      if (!user) {
        res.status(404).send()
      } else {
        res.json(user)
      }
    } else {
      res.sendStatus(401)
    }
  } catch (error) {
    next(error)
  }
})

/**CREATE USER**/

router.post('/newuser', async (req, res, next) => {
  try {
    const {firstName, lastName, email, password} = req.body

    const createUser = await User.create({
      firstName,
      lastName,
      email,
      password
    })
    const cart = await Order.create({})
    await createUser.addOrder(cart)
    console.log(cart)
    res.status(200).send('User created!')
  } catch (error) {
    next(error)
  }
})
