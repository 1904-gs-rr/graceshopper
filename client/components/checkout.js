import React from 'react'
import {connect} from 'react-redux'
import {getCart, guestAdd} from '../store/cart'
import {NavLink} from 'react-router-dom'
import Axios from 'axios'
import history from '../history'
import StripeCheckout from 'react-stripe-checkout'
class Checkout extends React.Component {
  constructor() {
    super()
  }
  componentDidMount() {
    this.props.getCart()
  }
  async submitOrder() {
    try {
      await Axios.put('/api/checkout')
      history.push('/thanks')
    } catch (err) {
      history.push('/guestcheckout')
    }
  }

  submitGuestOrder() {
    localStorage.removeItem('cart')
  }
  async onToken(token) {
    const body = {
      amount: 999,
      token: token
    }

    try {
      await Axios.post('/api/payment', body)
      alert('success')
      await Axios.put('/api/checkout')
      history.push('/thanks')
    } catch (error) {
      alert('payment failure')
    }
  }
  render() {
    return (
      <div>
        <h1>Products in Cart:</h1>
        {this.props.cart.map(product => {
          return (
            <div key={product.id}>
              <h3>{product.name}</h3>
              <img src={product.imageUrl} />
              <h3>Quantity: {product.cartQuantity} </h3>
            </div>
          )
        })}
        <button onClick={this.submitOrder}>Submit Order</button>
        <StripeCheckout
          name="test"
          token={this.onToken}
          amount={100}
          stripeKey="pk_test_lUoCpN1soU0i1I1tV7QzSHRb0065Cz2rxj"
        />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    cart: state.cart
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getCart: () => {
      return dispatch(getCart())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout)
