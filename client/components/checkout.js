import React from 'react'
import {connect} from 'react-redux'
import {getCart, guestAdd} from '../store/cart'
import {NavLink} from 'react-router-dom'
import Axios from 'axios'

class Checkout extends React.Component {
  constructor() {
    super()
  }
  componentDidMount() {
    this.props.getCart()
  }
  async submitOrder() {
    await Axios.put('/api/checkout')
  }

  submitGuestOrder() {
    localStorage.removeItem('cart')
  }

  render() {
    console.log(this.props.cart)
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