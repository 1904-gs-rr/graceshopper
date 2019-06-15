import React from 'react'
import {connect} from 'react-redux'
import {getCart, guestAdd, addingItem} from '../store/cart'
import {NavLink} from 'react-router-dom'

class Cart extends React.Component {
  constructor() {
    super()
  }
  changeQuantity(prod) {
    let cart = JSON.parse(localStorage.getItem('cart'))
    cart.forEach(el => {
      if (el.id === prod.id) {
        el.cartQuantity = this.refs.productQuantity.value
      }
    })
    localStorage.setItem('cart', JSON.stringify(cart))
    this.props.guestAdd(cart)
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
    let options = []
    // let selectQuantity = 10 < availableBeforeCheckout ? 10 : product.quantity
    for (let i = 0; i <= 10; i++) {
      options.push(
        <option key={i} value={String(i)}>
          {i}
        </option>
      )
    }
    return (
      <div>
        <h1>Products in Cart:</h1>
        <div className="all-products-in-cart">
          {this.props.cart.map(product => {
            return (
              <div key={product.id}>
                <h3>{product.name}</h3>
                <img src={product.imageUrl} />
                <h3>Quantity: {product.cartQuantity} </h3>
                <select value={product.cartQuantity}>{options}</select>
                <button
                  type="button"
                  onClick={
                    this.props.user.id
                      ? () => this.props.userAdd(product, event.target.value)
                      : () => this.changeQuantity(product)
                  }
                >
                  Change Quantity
                </button>
              </div>
            )
          })}
        </div>
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
    },
    userAdd: (item, quantity) => {
      return dispatch(addingItem(item, quantity))
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Cart)
