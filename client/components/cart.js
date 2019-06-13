import React from 'react'
import {connect} from 'react-redux'
import {getCart, guestAdd} from '../store/cart'
import {NavLink} from 'react-router-dom'

class Cart extends React.Component {
  constructor() {
    super()
  }
  componentDidMount() {
    if (this.props.user.id) {
      this.props.getCart()
    } else {
      let cart = JSON.parse(localStorage.getItem('cart'))
      if (cart === null) {
        cart = []
      }
      this.props.guestAdd(cart)
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
    },
    guestAdd: cart => {
      return dispatch(guestAdd(cart))
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Cart)
