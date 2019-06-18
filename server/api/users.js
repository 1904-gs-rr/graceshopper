const router = require('express').Router()
const {User, Order} = require('../db/models/')
module.exports = router

router.get('/', async (req, res, next) => {
  console.log(req.user)
  if (req.user.isAdmin) {
    let response = await User.findAll()
    res.json(response)
  } else res.sendStatus(401)
})

/*GET SINGLE USER BY ID*/
router.get('/:id', async (req, res, next) => {
  //because of passport, every user is included in req requests in all routes:
  // if (req.session.userId === +req.params.id)
  if (req.user.isAdmin) {
    const user = await User.findOne({
      where: {
        id: req.params.id
      }
    })
    res.json(user)
  }

  if (req.user.id === +req.params.id)
    try {
      {
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
      }
    } catch (error) {
      next(error)
    }
  else {
    res.sendStatus(401)
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
    res.status(200).send('User created!')
  } catch (error) {
    next(error)
  }
})

/**EDIT USER PROFILE**/

router.put('/edituser', async (req, res, next) => {
  try {
    const {id, firstName, lastName, email, password} = req.body

    const [useless, editedUser] = await User.update({
      firstName,
      lastName,
      email,
      password,
      where: {
        id: id,
        returning: true
      }
    })
    console.log('USERERERE', editedUser)
    res.status(200).send(editedUser)
  } catch (error) {
    next(error)
  }
})
