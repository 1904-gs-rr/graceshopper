/* global describe beforeEach it */

const db = require('../index')
const User = db.model('user')
const Order = db.model('order')
const chai = require('chai')
const expect = chai.expect
const dirtyChai = require('dirty-chai')
chai.use(dirtyChai)

describe('User model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('instanceMethods', () => {
    describe('correctPassword', () => {
      let cody

      beforeEach(async () => {
        cody = await User.create({
          email: 'cody@puppybook.com',
          password: 'bones'
        })
      })

      it('returns true if the password is correct', () => {
        expect(cody.correctPassword('bones')).to.be.equal(true)
      })

      it('returns false if the password is incorrect', () => {
        expect(cody.correctPassword('bonez')).to.be.equal(false)
      })
    }) // end describe('correctPassword')
  })

  describe('User/Order association', () => {
    let user1, order1, order2
    beforeEach(async () => {
      user1 = await User.create({
        email: 'cody@gmail.com',
        password: '12345'
      })

      order1 = await Order.create({
        status: true
      })

      order2 = await Order.create({
        status: false
      })

      await user1.setOrders([order1, order2])
    })
    describe('User', () => {
      it('has associated orders', async () => {
        let result = await user1.hasOrders([order1, order2])
        expect(result).to.equal(true)
      })
    })
  })
})

// end describe('instanceMethods')
// end describe('User model')
