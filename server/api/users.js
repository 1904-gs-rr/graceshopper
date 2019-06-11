const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router

/*GET SINGLE USER BY ID*/

router.get('/:id', async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        id: req.params.id
      },
      include: [
        {
          model: product_cart,
          where: {
            cartId: user.cartId
          }
        }
      ]
    })
    if (!user) {
      res.status(404).send()
    } else {
      res.json(user)
    }
  } catch (error) {
    next(error)
  }
})

/**CREATE USER**/

router.post('/newuser', async (req, res, next) => {
  try {
    firstName = req.body.firstName
    lastName = req.body.lastName
    email = req.body.email
    password = req.body.password
    const createUser = await User.create({
      firstName,
      lastName,
      email,
      password
    })
    res.status(200).send('User created!')
  } catch (error) {
    next(error)
  }
})
