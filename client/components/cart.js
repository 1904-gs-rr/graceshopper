import React from 'react'
import {connect} from 'react-redux'
import {persistStore} from 'redux-persist'

import {me} from '../store/user'
import {getCart, guestAdd, addingItem} from '../store/cart'
import {NavLink} from 'react-router-dom'

class Cart extends React.Component {
  constructor() {
    super()
    this.state = {
      value: 0
    }
    this.handleChange = this.handleChange.bind(this)
    this.changeQuantity = this.changeQuantity.bind(this)
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
    console.log('USER IN CART:', this.props.user)
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
  handleChange(event) {
    this.setState({value: event.target.value})
  }
  render() {
    console.log('USER ID:', this.props.user.id)
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
                <form>
                  <select ref="productQuantity" onChange={this.handleChange}>
                    {options}
                  </select>
                  <button
                    type="button"
                    onClick={
                      this.props.user.id
                        ? () => this.props.userAdd(product, this.state.value)
                        : () => this.changeQuantity(product)
                    }
                  >
                    Change Quantity
                  </button>
                </form>
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
    },
    me: () => {
      return dispatch(me())
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Cart)
