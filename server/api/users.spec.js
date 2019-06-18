/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const User = db.model('user')
const Product = db.model('product')

describe('Backend security', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/users/', () => {
    beforeEach(async () => {
      const newTestPlanet = await Product.create({
        name: 'testplanet',
        imageUrl:
          'https://cdn.mos.cms.futurecdn.net/uxyTQorrAz7z8KcVZzPjDe.jpg',
        quantity: 5,
        price: 10
      })
      return newTestPlanet
    })

    it('GET /api/products/1', async () => {
      const res = await request(app)
        .get('/api/products/1')
        .expect(200)

      expect(res.status).to.equal(200)
      expect(res.body.name).to.be.equal('testplanet')
    })
  }) // end describe('/api/users')
}) // end describe('User routes')
