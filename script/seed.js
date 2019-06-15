'use strict'

const db = require('../server/db')
const {User, Product, Order} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({email: 'cody@email.com', password: '123'}),
    User.create({email: 'murphy@email.com', password: '123'})
  ])
  const products = await Promise.all([
    Product.create({
      name: 'Cups',
      imageUrl:
        'https://cdn.shopify.com/s/files/1/0770/4637/products/black_main_large.jpg?v=1454511927',
      quantity: 10,
      price: 1500
    }),
    Product.create({
      name: 'Plates',
      imageUrl:
        'https://cdn.shopify.com/s/files/1/0078/3807/2889/products/small_woodgrain_plate_300x300.jpg?v=1532459883',
      quantity: 8,
      price: 1200
    }),
    Product.create({
      name: 'Forks',
      imageUrl:
        'https://sc01.alicdn.com/kf/HTB1UAIPncjI8KJjSsppq6xbyVXaK/SUS-201-stainless-steel-small-metal-fork.jpg_300x300.jpg',
      quantity: 5,
      price: 400
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
