const router = require('express').Router()
const {User, Cart} = require('../db/models/')
module.exports = router

/*GET SINGLE USER BY ID*/
router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
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
    const cart = await Cart.create({})
    await createUser.setCart(cart)
    console.log(cart)
    res.status(200).send('User created!')
  } catch (error) {
    next(error)
  }
})
