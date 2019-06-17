'use strict'

const db = require('../server/db')
const {User, Product, Order} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({email: 'cody@email.com', password: '123', isAdmin: true}),
    User.create({email: 'murphy@email.com', password: '123'})
  ])
  const products = await Promise.all([
    Product.create({
      name: 'Galacticos 3X8VD',
      imageUrl:
        'http://pluspng.com/img-png/planet-png-hd-moon-and-planets-hd-lwp-300.png',
      quantity: 10,
      price: 27499999
    }),
    Product.create({
      name: 'Cormorant 3SSI',
      imageUrl: 'http://pluspng.com/img-png/planet-png-hd--300.png',
      quantity: 8,
      price: 30000000
    }),
    Product.create({
      name: 'Valkyrie',
      imageUrl: 'http://pluspng.com/img-png/planet-png-hd--300.png',
      quantity: 5,
      price: 19500000
    })
  ])
  const order = await Order.create({})
  const order2 = await Order.create({})
  await users[0].addOrder(order)
  await order.setProducts(products)
  await users[1].addOrder(order2)
  console.log(`seeded ${users.length} users`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
