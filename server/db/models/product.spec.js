/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const Product = db.model('product')

describe('Product model', () => {
  describe('validations', () => {
    it('requires `name`', async () => {
      const product = Product.build({
        price: 12
      })

      try {
        await product.validate()
        throw Error(
          'validation was successful but should have failed without `name`'
        )
      } catch (err) {
        expect(err.message).to.contain('name cannot be null')
      }
    })

    it('requires `name` to not be an empty string', async () => {
      const product = Product.build({
        name: '',
        price: 12
      })

      try {
        await product.validate()
        throw Error(
          'validation was successful but should have failed if name is an empty string'
        )
      } catch (err) {
        expect(err.message).to.contain('Validation error')
        /* handle error */
      }
    })

    it('requires `price`', async () => {
      const product = Product.build({
        name: 'Cody'
      })

      try {
        await product.validate()
        throw Error(
          'validation was successful but should have failed without `name`'
        )
      } catch (err) {
        expect(err.message).to.contain('price cannot be null')
      }
    })

    it('requires `price` to be an integer', async () => {
      const product1 = Product.build({
        name: 'Cody',
        price: 12.5
      })

      const product2 = Product.build({
        name: 'Cody',
        price: 12
      })

      try {
        await product1.validate()
        throw Error(
          'validation was successful but should have failed if price is not an integer'
        )
      } catch (err) {
        expect(err.message).to.contain('Validation error')
        /* handle error */
      }

      try {
        await product2.validate()
      } catch (err) {
        throw Error('Validation error')
      }
    })
  })
})
