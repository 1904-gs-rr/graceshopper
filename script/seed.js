'use strict'

const db = require('../server/db')
const {User} = require('../server/db/models')
const {Product} = require('../server/db/models')
const {Cart} = require('../server/db/models')
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
      quantity: 10
    }),
    Product.create({
      name: 'Plates',
      imageUrl:
        'https://media.istockphoto.com/photos/simple-circular-porcelain-plate-isolated-on-whit-picture-id860188194?k=6&m=860188194&s=612x612&w=0&h=S101EorVtE1kwwms-d-_yXboTNwtdqCFb8meV8_Lxu0=',
      quantity: 8
    }),
    Product.create({
      name: 'Forks',
      imageUrl:
        'https://media.gettyimages.com/photos/dishware-picture-id598721906?s=2048x2048',
      quantity: 5
    })
  ])
  const cart = await Cart.create({})
  const cart2 = await Cart.create({})
  await users[0].setCart(cart)
  await cart.setProducts(products)
  await users[1].setCart(cart2)
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
